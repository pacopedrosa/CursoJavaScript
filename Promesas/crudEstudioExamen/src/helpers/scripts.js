import { getProducts } from "./getProducts"

export const crearProducto = async (getProducts, url, id, productDetails) => {
    try{
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoriaId: id, ...productDetails }), // Envía categoriaId junto con los detalles del producto
        });
        
        if(!data.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newProduct = await data.json();
        console.log("Producto creado correctamente:", newProduct);
    } catch (error) {
        console.log("Error:" + error.message);
    }

}

export const obtenerProductos = async (url) => {
    try {
        // Solicitud para obtener productos
        const data = await fetch(`${url}productos`);
        if (!data.ok) {
            throw new Error("Error al obtener productos");
        }
        const products = await data.json();

        // Solicitud para obtener categorías
        const categorias = await fetch(`${url}categorias`);
        if (!categorias.ok) {
            throw new Error("Error al obtener categorías");
        }
        const categoriasData = await categorias.json();

        // Agregar el nombre de la categoría correspondiente a cada producto
        const productos = products.map(product => {
            const category = categoriasData.find(cat => cat.id === String(product.categoriaId)); //Aqui debemos poner el String porque en la data es "" y 
                                                                                                 //y por ello debe ser String para que lo pueda comparar
            return {
                ...product,
                nombreCategoria: category ? category.nombre : "Categoría desconocida"
            };
        });

        return productos;

    } catch (error) {
        console.log("Error: " + error.message);
    }
};



export const actualizarProducto = async (url, productId, datosActualizados) => {
    try {
        const data = await fetch(`${url}productos/${productId}`, {
            method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
        });
        if(!data.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productoActualizado = await data.json();
        return productoActualizado;
        
    } catch (error) {
        console.log("Error" +  error.message);
    }

}

export const eliminarProducto = async (url, productId) => {
    try {
        const response = await fetch(`${url}productos/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); 
        return result;

    } catch (error) {
        console.log("Error: " + error.message);
    }
};



export const eliminarProductosAllSettled = async (productId, url) => {
    try{
        const eliminaciones = productId.map(id => eliminarProducto(url, id));
        const data = await Promise.allSettled(eliminaciones);

        data.forEach((element, index) =>{
            if(element.status === "fulfilled"){
                console.log(`Producto eliminado correctamente: ${productId[index]}`);
            }else{
                console.log("Error");
            }
        })
    } catch (error) {
        console.log("Error" + error.message);
    }
}

export const obtenercategorias = async (url) => {
    try {
        const response = await fetch(`${url}categorias`);
        if (!response.ok) {
            throw new Error("Error al obtener categorías");
        }
        const data = await response.json();
        
        // Asegurarse de que cada categoría solo tiene id y nombre
        const info = data.map(categoria => ({
            id: categoria.id,
            nombre: categoria.nombre
        }));

        return info;
    } catch (error) {
        console.log("Error: " + error.message);
    }
};


export const crearCategorias = async (url, newCategoryData) => {
    try {
        const response = await fetch(`${url}categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: newCategoryData.nombre  // Solo enviar el nombre
            })
        });

        if (!response.ok) {
            throw new Error("Error al crear la categoría");
        }

        const data = await response.json();
        return {
            id: data.id,           // Devolver solo id y nombre
            nombre: data.nombre
        };
    } catch (error) {
        console.log("Error: " + error.message);
    }
};

export const obtenerCrearWithPromiseAll = async (url, newCategoryData) => {
    try {
        // Asegurarse de usar obtenercategorias y crearCategorias con los nombres correctos
        const [categorias, nuevaCategoria] = await Promise.all([
            obtenercategorias(url),   // Cambiado a obtenercategorias
            crearCategorias(url, newCategoryData)   // Cambiado a crearCategorias
        ]);

        console.log("Categorías obtenidas:", categorias);
        console.log("Nueva categoría creada:", nuevaCategoria);

        // Retornar ambas respuestas como un solo objeto
        return {
            categorias,
            nuevaCategoria
        };
    } catch (error) {
        console.log("Error: " + error.message);
    }
};

export const añadirComentariosAProductos = async (url, comentario) => {
    try {
        const response = await fetch(`${url}comentarios`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: comentario.id, //id del comentario
                usuario: comentario.usuario,         // Nombre del usuario
                contenido: comentario.contenido,     // Contenido del comentario
                calificacion: comentario.calificacion, // Calificación
                productoId: comentario.productoId    // ID del producto
            })
        });

        if (!response.ok) {
            throw new Error("Error al añadir el comentario");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Error: " + error.message);
    }
};



export const filtrarProductos = async (url, precio, stock) => {
    try {
        const response = await fetch(`${url}productos`);
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        
        // Filtrar productos según precio y stock
        const productosFiltrados = data.filter(product =>{
            return product.stock <= stock ||  product.precio <= precio
        })
        console.log(productosFiltrados);        
    } catch (error) {
        console.log("Error" + error.message);
    }
}

export const obtenerHistorialPrecios = async (url, productoId) => {
    try {
        const response = await fetch(`${url}historialPrecios`); // Obtener todos los historiales de precios
        if (!response.ok) {
            throw new Error("Error al obtener historial de precios");
        }

        const data = await response.json();
        
        // Filtrar el historial de precios para el productoId dado
        const historial = data.find(item => item.productoId == productoId);
        
        if (historial) {
            console.log("Historial de precios del producto:", historial);
            return historial;
        } else {
            throw new Error("Historial de precios no encontrado para el producto " + productoId);
        }

    } catch (error) {
        console.log("Error: " + error.message);
    }
};


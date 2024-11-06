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
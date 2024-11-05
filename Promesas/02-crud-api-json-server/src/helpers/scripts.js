const dataUrl = "http://localhost:4000/productos";
const categoriasUrl = "http://localhost:4000/categorias";
export const insertData = async (newData)=>{
    try{    

      //Aqui obtenemos todas las categorias

      const categoryresponse = await fetch(categoriasUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(!categoryresponse.ok){
        throw new Error(`HTTP error! status: ${categoryResponse.status}`);
      }

      //Aqui miramos si existe la categoria para ver añadir una nueva ono

      const categoryData = await categoryresponse.json();
      const category = categoryData.find(category => category.nombre === newData.nombre);

      if(!category){
        const addCategory = fetch(categoriasUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nombre: newData.categoria})
        })

        if(!addCategory){
          throw new Error("Error al añadir la categoria");
        }
      }


      const response = await fetch(dataUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }else{
        const data = await response.json();
        console.log("Data insertada correctamente: ", data);
        return data;
      }
    }catch(error){
        console.error("Error al insertar la data: ", error);
    }
}




export const obtenerProducto = async () => {
  try {
    // Obtener todas las categorías
    const categorias = await fetch(categoriasUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!categorias.ok) {
      throw new Error(`HTTP error! status: ${categorias.status}`);
    }

    const categoriasData = await categorias.json();
    console.log("Categorias:", categoriasData);  // Muestra las categorías correctamente

    // Obtener todos los productos
    const productos = await fetch(dataUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!productos.ok) {
      throw new Error(`HTTP error! status: ${productos.status}`);
    }

    const productosData = await productos.json();
    console.log("Productos obtenidos correctamente:", productosData);

    // Asociar cada producto con su categoría correspondiente
    const productosConCategoria = productosData.map(producto => {
      const categoria = categoriasData.find(cat => cat.id == producto.categoria);
      return {
        id: producto.id,
        nombre: producto.nombre,
        stock: producto.stock,
        imagen: producto.imagen,
        categoria: producto.categoria,
        nombreCategoria: categoria ? categoria.nombre : 'Categoría no encontrada'
      };
    });

    console.log("Cabecera GET enviada para productos y categorías:", {
      'Content-Type': 'application/json'
    });

    console.log("Productos con categorías:", productosConCategoria);
    return productosConCategoria;

  } catch (error) {
    console.error("Error al obtener los datos: ", error);
  }
};

// Función DELETE para eliminar un producto
export const eliminarProducto = async (productId) => {
  try {
      const response = await fetch(data, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error al eliminar el producto: ${response.status}`);
      }

      console.log(`Producto con ID ${productId} eliminado correctamente.`);
  } catch (error) {
      console.error("Error al eliminar el producto:", error);
  }
};

// Función PUT para actualizar un producto
export const actualizarProducto = async (productId, updatedData) => {
  try {
      const response = await fetch(dataUrl.concat('/', productId), { // Usamos `concat` para construir la URL
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
          throw new Error(`Error al actualizar el producto: ${response.status}`);
      }

      const data = await response.json();
      console.log("Producto actualizado correctamente:", data);
      return data;
  } catch (error) {
      console.error("Error al actualizar el producto:", error);
  }
};


//Solucionar el error de la actualización
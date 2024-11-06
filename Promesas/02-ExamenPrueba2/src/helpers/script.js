  // Dado el siguiente json de producto y ventas se pide:

  //1. Crear una funcion llamada generateProductMap que le pase como parametro una data de productos y automaticamente me 
  //devuelva un map cuya clave es el nombre del producto y cuyo valor es un objeto con el precio la cantidad 
  //el array de talla disponibles y el array de colores.
  //Si se le pasa como segundo parametro la palabra save almacenara dicho map en el localStorage en la clave 
  //data productos siempre y cuando no exista ya esa clave

import { getProducts } from "./getProduct";

const urlProducts = `${import.meta.env.VITE_URL_SERVER}/productos`;

  /**
   * @description recibe un array de productos y muestra el objeto con los valores pedidos
   * @param {Array<Object>} dataProducts 
   * @param {String} save 
   * @returns {Map<String, Object>} mapProduct || {String}
   */
  export const generateProductMap = (dataProducts, save="noSave") => {
    const mapProducts = new Map();
    dataProducts.forEach((producto) => {
        const clave = producto.nombre
        const valor = {
            precio: producto.precio,
            cantidad: producto.stock.cantidad,
            colores: producto.detalles.colores,
            tallas: producto.detalles["tallas disponibles"],
        }
        mapProducts.set(clave, valor);
    })
    if(!save === "noSave"){
        localStorage.setItem("dataProductos", JSON.stringify([...mapProducts]));
        return "guardado en el localStorage"
    }else{
        return mapProducts
    }

}

/**
 * @description recibe un array de productos y muestra el objeto con los valores pedidos
 * @param {Function} getProducts 
 * @param {String} save 
 * @param {String} url 
 * @returns {Map<String, Object>} mapProductos || {String}
 */
export const generatedMapProductV2 = async (getProducts, save="noSave", url) => {
    //Saco la data con getProduct
    try{
    const dataProducts = await getProducts(url);

    const mapProducts = new Map();
    dataProducts.forEach((producto) => {
        const clave = producto.nombre
        const valor = {
            precio: producto.precio,
            cantidad: producto.stock.cantidad,
            colores: producto.detalles.colores,
            tallas: producto.detalles["tallas disponibles"],
        }
        mapProducts.set(clave, valor);
    })
    if(!save === "noSave"){
        localStorage.setItem("dataProductos", JSON.stringify([...mapProducts]));
        return "guardado"
    }else{
        return mapProducts
    }

    }catch(e){
        console.error("Error al obtener los productos", e)
    }
}

//Ejercicio 2

//crear una funcion llamada modificar tallas que  le pase como parametro la data 
//(o la funcion que se trae la data) que añade la talla xs a todas las prendas deportivas.
//Me mostrara por pantalla todos los productos que han sido modificados

export const modificarTallas = async (getProducts, url) => {
    try{
        const dataProducts = await getProducts(url);
        const productsModified = [];
        const productosModificados = dataProducts.map(async(producto) => {
          const {id, categoria, detalles, nombre} = producto

          if(categoria.nombre === "Ropa" && categoria.subcategorias.includes("Deportiva") && !detalles["tallas disponibles"].includes("XS")){
            // detalles["tallas disponibles"].unshift("XS")
            detalles["tallas disponibles"] = ["XS" ,...detalles["tallas disponibles"]];
            productsModified.unshift(nombre);
            //Envio a la API el producto modificado
           const response = await fetch(`${import.meta.env.VITE_URL_SERVER}productos/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(producto)
            })

            if(!response.ok){
              throw new Error(`Error al modificar el producto: ${response.status}`);
            }
            return producto;
          }else{
            return producto;
          }
        })
        console.log("Productos modificados:", productsModified);

    }catch(err){
        console.error("Error al modificar las tallas", err);
    }

}

//Hacer un buscar y un borrar

export const searchProduct = async (getProducts, url, productoBuscar) => {
  try {
    const dataProducts = await getProducts(url);
    const productoEncontrado = dataProducts.find((producto) => producto.nombre === productoBuscar);
    if(productoEncontrado){
      console.log("Producto encontrado:", productoEncontrado);
    }else{
      console.log("Producto no encontrado");
    }
  } catch (error) {
    console.log("Error al buscar", error);
  }
}

export const deleteProduct = async (getProducts, urlBase, productoId) => {
  try {
    const response = await fetch(`${urlBase}productos/${productoId}`, { // Concatenación correcta de URL
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error al borrar el producto: ${response.status}`);
    }
    
    console.log("Producto borrado correctamente");
    
    // Llama a `getProducts` después de borrar el producto para actualizar la lista
    return await getProducts(`${urlBase}productos`);
  } catch (err) {
    console.log("Error al borrar", err);
    return null;
  }
};



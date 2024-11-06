import { getProducts } from "./helpers/getProducts";
import { crearProducto, obtenerProductos, actualizarProducto } from "./helpers/scripts";

const url = `${import.meta.env.VITE_URL_SERVER}`;
const newProduct = {
    nombre:'productoactualizado',
    stock: '90',
    precio: '10',
}

    
 actualizarProducto(url, 1, newProduct).then(()=>{
    console.log("Producto actualizado correctamente");
 }).catch(err => {
    console.log("Error al actualizar el producto:", err);
 })
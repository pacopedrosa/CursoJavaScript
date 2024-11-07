import { getProducts } from "./helpers/getProducts";
import { crearProducto, obtenerProductos, actualizarProducto,eliminarProducto,eliminarProductosAllSettled,
    crearCategorias,obtenerCrearWithPromiseAll,obtenercategorias, añadirComentariosAProductos,filtrarProductos,obtenerHistorialPrecios } from "./helpers/scripts";

const url = `${import.meta.env.VITE_URL_SERVER}`;
const newCategory = {
    id:1,
    nombre:'nombre',

}

const comentario = {
    id:10,
    usuario: "Ana",
    contenido: "Me encanta este producto",
    calificacion: 5,
    productoId: 1
};

obtenerHistorialPrecios(url,1);
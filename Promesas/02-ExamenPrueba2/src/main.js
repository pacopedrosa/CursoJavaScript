import { getProducts } from "./helpers/getProduct";
import { deleteProduct } from "./helpers/script";

const urlBase = `${import.meta.env.VITE_URL_SERVER}`; // Solo URL base

const init = async () => {
    try {
        const products = await getProducts(`${urlBase}productos`);
        const result = await deleteProduct(getProducts, urlBase, 1);

        console.log("Productos generados:", result);
    } catch (err) {
        console.error("Error al cargar los productos", err);
        return;
    }
};

init();

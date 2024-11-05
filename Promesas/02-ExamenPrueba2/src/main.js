import { getProducts } from "./helpers/getProduct";
import { generateProductMap, generatedMapProductV2, modificarTallas } from "./helpers/script";


const urlProducts = `${import.meta.env.VITE_URL_SERVER}productos`;

const init = async () => {
    try {
        const products = await getProducts(urlProducts);
        const result = generateProductMap(products, "save");

        const result2 = await generatedMapProductV2(getProducts, "save", urlProducts)

        const result3 = await modificarTallas(getProducts, urlProducts)

        console.log("Productos generados:", result3);

    }catch(err) {
        console.error("Error al cargar los productos", err);
        return;
    }
}

init(); 
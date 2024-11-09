import { getRecipesCache,filterByTime, getRecetas,orderRecipesByDifficulty,scroreRecipe,addIngredients,getRecipeDetails } from "./helpers/scripts";

const url1 = import.meta.env.VITE_URL;
const nombreReceta = "Pasta Carbonara";
const arrayIngredientesParaAñadir=["Prueba1","Prueba2"]
console.log(url1);

const init = async () =>{
    // const result = await addIngredients(getRecetas,nombreReceta,arrayIngredientesParaAñadir);
    console.log(result);
}

export const init2 = async () => {
    console.log("Starting tests...");

    try {
        const cache = await getRecipesCache();
        console.log("getRecipesCache:", cache);
    } catch (error) {
        console.log("Error:", );
    }

    try {
        const recetas = await getRecetas();
        console.log("getRecetas:", recetas);
    } catch (error) {
        console.log("Errors:");
    }

    try {
        console.log(" filterByTime:");
        await filterByTime(getRecetas, 10, 30);
    } catch (error) {
        console.log("Error:", error.message);
    }

    try {
        const map = await orderRecipesByDifficulty(getRecetas);
        console.log("orderRecipesByDifficulty:", map);
    } catch (error) {
        console.log("Error:", error.message);
    }

    try {
        console.log(" ejecutando");
        await scroreRecipe(getRecetas, 1, 4, "http://localhost:3500/recetas"); 
    } catch (error) {
        console.log("Error:", error.message);
    }

    try {
        console.log(" Añadiendo ");
        await addIngredients(getRecetas, "Receta Ejemplo", ["ingrediente1", "ingrediente2"]);
    } catch (error) {
        console.log("Error addIngredients:", error.message);
    }

    console.log("Tests.");
};

init2();



/**
 * @author Paco PA
 * @description Mostrar del localStorage los datos almacenados o hacer un fetch
 * @returns {Array}
 */
export const getRecipesCache = async () => {
    try {
        const cache = JSON.parse(localStorage.getItem('recetas-cache')) || {};
        const tiempo = Date.now();
        
        if (cache.timeStamp && (tiempo - cache.timeStamp) < 5 * 60 * 1000) {
            return cache.recetas;   
        }

        const response = await getRecetas();
        if (!response.ok) {
            throw new Error("Error al obtener las recetas.");
        }

        const newCache = {
            recetas: response,
            timeStamp: tiempo
        };
        localStorage.setItem('recetas-cache', JSON.stringify(newCache.values));
        return data;  
    } catch (error) {
        console.log("Error " + error.message);
        return [];  
    }
};

/**
 * @author Paco PA
 * @description Mostrar todas las recetas
 * @returns {Array}
 */
export const getRecetas = async () => {
    try {
        const response = await fetch("http://localhost:3500/recetas");

        if(!response.ok){
            throw new Error("Error")
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error " + error.message );
    }
}

/**
 * @author Paco PA
 * @description Filtrar por duracion recetas
 * @param {Function} getRecetas 
 * @param {Number} minTime 
 * @param {Number} maxTime 
 * @returns {Array}
 */

export const filterByTime = async(getRecetas, minTime, maxTime) => {
    try {
    const response = await getRecetas();
    const filtrados = response.filter(element => element.tiempo>minTime&&element.tiempo<maxTime)
    console.log(filtrados);
    } catch (error) {
        console.log("Error" + error.message);    
    }
}


/**
 * @author Paco PA
 * @description Devolver detalles de todas las recetas
 * @param {Array} idsRecetas 
 * @returns {Array}
 */
export const getRecipeDetails = async (idsRecetas = []) =>{
  try {
    const fetchPromise = idsRecetas.map((id) => {
        fetch(`http://localhost:3500/recetas/${id}`).then(response => response.json())
        .catch(error => console.error(`Error`, error));
    })
    return await Promise.all(fetchPromise);
  } catch (error) {
        console.log("error" + error.message);
  }
}

/**
 * @author Paco PA
 * @description Devolver un map con las dificultades y sus recetas
 * @param {Function} getRecetas 
 * @returns {Map}
 */
export const orderRecipesByDifficulty = async (getRecetas) => {
    try {
        
    
    let map = new Map();
    const response = await getRecetas();

    response.filter(element => {
        if(element.dificultad === "facil"){
            const arrayFacil = []
            arrayFacil.push(element)
            map.set("facil", arrayFacil)
        }else if(element.dificultad === "media"){
            const arrayMedio = []
            arrayMedio.push(element)
            map.set("media", arrayMedio)
        }else if(element.dificultad === "alta"){
            const arrayAlto = []
            arrayAlto.push(element)
            map.set("alto", arrayAlto)
        }
    })
    return map;

    } catch (error) {
        console.log("Error" + error.message);    
    }
}


/**
 * @author Paco PA
 * @description Busque la receta por recetaId y actualice el campo valoracion con la nuevaValoracion
 * @param {Function} getRecetas 
 * @param {Number} recetaId 
 * @param {Number} nuevaValoracion 
 * @returns {Array}
 */
export const scroreRecipe = async (getRecetas, recetaId, nuevaValoracion, url) => {
    try {
    if(nuevaValoracion<0 && nuevaValoracion>5){
        return "La valoracion debe estar entre 0 y 5"
    }

    const response = await fetch(`${url}/${recetaId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({valoracion: nuevaValoracion}) 
    })

    if(!response.ok){
        throw new Error("Error")
    }

    const data = await response.json();
    console.log(data);
    }catch (error) {
        console.log("Error" + error.message);
    }
}

export const addIngredients = async (getRecetas, nombreReceta, arrayIngredientesParaAñadir = []) => {
    const url = "http://localhost:3500/recetas";
    try {
        const recetas = await getRecetas();

        const recetaEncontrada = recetas.find(element => element.nombre === nombreReceta);
        if (!recetaEncontrada) {
            throw new Error("Receta no encontrada");
        }

        const ingredientesUnicos = new Set([
            ...recetaEncontrada.ingredientes,
            ...arrayIngredientesParaAñadir
        ]);

        const ingredientesActualizados = Array.from(ingredientesUnicos);

        const response = await fetch(`${url}/${recetaEncontrada.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...recetaEncontrada, ingredientes: ingredientesActualizados })
        });

        if (!response.ok) {
            throw new Error("Error al actualizar los ingredientes de la receta");
        }

        const actualizacion = await response.json();
        console.log("Receta actualizada:", actualizacion);
        return actualizacion;
        
    } catch (error) {
        console.log("Error: " + error.message);
    }
};


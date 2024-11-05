//usando el map 

/**
 * dado un string usa map para contar la frecuencia de cada palabra
 * @param {String} texto 
 * @return {}
 */

export const contarFrecuenciaPalabras = (texto) => {
    const wordCount = new Map();
    texto.split(' ').array.forEach(word => {
        wordCount.set(word, wordCount.get(word || 0) + 1 );
    });
    return wordCount;
}

// verifica que todos los elementos de ese array son unicos

export const verificarUnicos = (array) => {
    const unicos = new Set(array);
    if (unicos.size === array.length) {
        return true;
    }else{
    return false;
}
}


export const verificarUnicos_2 = (array) => {
 return [...new Set(array)].length === array.length;
}


//si tengo un array de ejercicios de el 1 al 27 como desordenar 

export const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}
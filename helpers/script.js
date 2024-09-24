/**
 * @autor
 * @version
 * @description
 * @param
 * @returns {undefined}
 */

// Definimos la función 

 export function saludar(){
    console.log("Hola, mundo!");
    }
    
    // Llamamos a la función  para que se ejecute
        
    /**
     * @description: Esta función saluda al usuario con un mensaje personalizado.
     * @param {string} nombre 
     * @returns {string}
     * 
     */
   export function saludarConNombre(nombre){
        return `Bienvenido, ${nombre ?? "usuario"}!`;
    }
    
    
    /**
     * @description : Esta función evalua si un número es positivo, negativo o cero.
     * @param {Number} num1 
     * @returns {String}
     */
    
   export function numero(num1){
        return `${(num1 > 0 ? 'El numero es positivo' : num1 < 0 ? 'El numero es negativo' : 'es cero')}`;
    }
    
    //crear una funcion que comprueba si un numero es primo, dicha funcion debe ser funcion 
    //flecha y que se llame esPrimo que le pase como parametro un numero, sino que coja el numero 0 y que devuelva
    //true o false si el numero es primo o no es primo

    //esta igualado a 0 por si no se mete nada

    /**
     * @description : este ejercicio dice si un numero es primo o no.
     * @param {Number} num 
     * @returns {Boolean}
     */

    export const esPrimo = (num=0) => {
        if(Number.isInteger(num) && num != 0){   k
            let contador = 0;
           for(let i = 2; i < num-1; i++){
             if(num % i == 0){
                 contador++;
                 break;
             }
             
           }
           if(contador == 0){
            return 'Es primo';
         }else{
             return 'No es primo';
         }
        }else{
            return 'Introduce un número entero';
        }
    }


    //Resolucion de una ecuacion de segundo grado
    
    //-b +-sqrt(b^2 - 4ac) / (2a)

    /**
     * @description : Resuelve una ecuación de segundo grado.
     * @param {Number} a 
     * @param {Number} b 
     * @param {Number} c 
     * @returns {Number}
     */

    export const resolverEcuacion = (a, b, c) => {
        let numero1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        let numero2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        return `La primera solución es ${numero1} y la segunda solución es ${numero2}`;
    };





    //dado un array de numeros, calcular el maximo, el minimo, el promedio y la mediana  (Mirar clase math y mirar spread operator).

    /**
     * @description : Calcula estadísticas de un array de números.
     * @param {Number} array 
     * @returns {String}
     */

    export const calculadorNumeros = (array) => {
        let maximo = Math.max(...array);
        let minimo = Math.min(...array);
        let promedio = 0;   
        let resultadoPromedio;
        for(let i = 0; i < array.length; i++){
                      promedio = promedio + array[i];     
                      resultadoPromedio = promedio / array.length;
        }
        let media = resultadoPromedio;
        let mediana; 
        array.sort((a, b) => a - b);
        let mitad = Math.floor(array.length / 2);
        if(array.length % 2 === 0){
            mediana = (array[mitad - 1] + array[mitad]) / 2;
        } else {
            mediana = array[mitad];
        }
        return `El máximo es ${maximo}, el mínimo es ${minimo}, el promedio es ${media}, y la mediana es ${mediana}`;
    };


//(a, b) => a - b: Es una función de comparación que se usa para ordenar los números en orden ascendente. Si a - b es negativo, a va antes que b. Si es positivo, b va antes que a.    
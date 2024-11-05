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


//Dado un array de numeros, calcular aquellos que son pares usando metodos de arrays

/**
 * @description : Calcula los números pares en un array de números.
 * @param {Number} 
 * @returns {Array}
 */

export const numerosPares = (num=[]) => {
    const pares = num.filter((num) => num % 2 === 0);
    return pares;
}


//mostrar por pantalla el ultimo numero impar

/**
 * @description : Muestra el último número impar en un array de números.
 * @param {Number} num 
 * @returns {Number}
 */

export const ultimoNumeroImpar = (num=[]) => {
    const impares = num.filter((num) => num % 2!== 0);
    return impares[impares.length-1];
};

//dado una array de ciudades crear una funcion que pase como parametro el array y el nombre de una ciudad y como tercer parametro new ciudad, que busca
// una ciudad en el array
//y si existe se reemplaza por la nueva ciudad y sino un mensaje que no se encontro la ciudad


export const reemplazarCiudad = (ciudades, nombreCiudad, newCiudad) => {
    for(let i = 0; i < ciudades.length; i++){
        if(ciudades[i] === nombreCiudad){
            ciudades[i] = newCiudad;
            return `La ciudad ${nombreCiudad} ha sido reemplazada por ${newCiudad}`;
        }else{
            return `No se encontró la ciudad ${nombreCiudad}`;
        }
    }
};

export const reemplazarCiudad2 = (ciudades, nombreCiudad, newCiudad) => ciudades.map(ciudad => ciudad === nombreCiudad? newCiudad : ciudad);


const transacciones = [
{id:1, mont:8, direccion:'0xabc'},
{id:2, mont:15, direccion:'0xdfe'},
{id:3, mont:22, direccion:'0xjkl'},
{id:4, mont:11, direccion:'0xmnq'},
];



// 1.filtrar aquellos transacciones de mas de 12 monto ordenadas de mayor a menor

/**
 * @description : Filtra transacciones con más de 12 monto y las ordena de mayor a menor.
 * @param {Array} transacciones 
 * @returns {Array}
 */

export const ordenTrasnsacciones = (transacciones) => {
    const transaccioness = [
        {id:1, mont:8, direccion:'0xabc'},
        {id:2, mont:15, direccion:'0xdfe'},
        {id:3, mont:22, direccion:'0xjkl'},
        {id:4, mont:11, direccion:'0xmnq'},
        ];

        let transOrdenado = transaccioness.filter(Transaccion => transaccion.mont > 12). transaccion.sort.reverse();
        return transOrdenado;
}


// 2.Buscar transaccion por la direccion y cuando la encuentre diga cuantas hay mayor que la suya y menores que la suya

/**
 * @description : Busca transacciones por dirección y cuantos hay mayores y menores que la suya.
 * @param {Array} transacciones 
 * @param {String} direccion 
 * @returns {String}
 */

export const buscarDireccion = (transacciones, direccion) => {
    const transaccioness = [
        {id:1, mont:8, direccion:'0xabc'},
        {id:2, mont:15, direccion:'0xdfe'},
        {id:3, mont:22, direccion:'0xjkl'},
        {id:4, mont:11, direccion:'0xmnq'},
        ];

        let busqueda = transaccioness.find(transaccion => transaccion.direccion === direccion);
        if(busqueda){
            let mayores = transacciones.filter(transaccion => transaccion.mont > busqueda.mont);
            let menores = transacciones.filter(transaccion => transaccion.mont < busqueda.mont);
            return `La direccion es ${direccion} y hay ${mayores.length} transacciones mayores que ${busqueda.mont} y ${menores.length} transacciones menores que ${busqueda.mont}`
        }
};



// 3.Valida que todos los bloques mantienen la integridad 

export const validarIntegridad = (bloques) => {

    const bloquess = [
        {id:1, hash:'abc123', prevHash:null},
        {id:2, hash:'def456', prevHash:'abc123'},
        {id:3, hash:'ghi789', prevHash:'def456'},
        {id:4, hash:'jkl012', prevHash:'ghi789'},
    ];

    for(let i = 0; i < bloquess.length; i++){
        for(let j = 1; j < bloquess.length; j++){

            if(bloquess[i].hash === bloquess[j].prevHash){
                return "La integridad de los bloques es correcta";
        }else{
               return "La integridad de los bloques es incorrecta";
            }
        }
    }    
}



const numeros = [2,5,8,1,3,0,7,4,9];

//usando reduce obten el maximo


/**
 * @description : Calcula el número máximo en un array de números.
 * @param {Array} numeros 
 * @returns {Number}
 */

export const numeroMaximo = (numeros=[]) => {
    numeros = [2,5,8,1,3,0,7,4,9];
    let maximo = numeros.reduce((acc, numeros) => acc > numeros ? acc:numeros , numeros[0]);
    return maximo;
};


//dado un array de numeros eliminar los repetidos con el reduce

/**
 * @description : Elimina los duplicados en un array de números.
 * @param {Array} numeros 
 * @returns {Array}
 */

export const numerosEliminados = (numeros = []) => {
    return numeros.reduce((acc, numero) => {
        if (acc.indexOf(numero) === -1) {
            acc.push(numero); 
        }
        return acc; 
    }, []);
};



//crear una funcion que le pase como parametro un array de nombres, y un numeros y me devuelva un array de objetos donde me diga nombre: , numero: 


/**
 * @description : Crea un array de objetos con nombres y números.
 * @param {Array} nombres 
 * @param {Number} num 
 * @returns {Array}
 */


export const crearArrayNombres = ( nombres = [], num = 0) => {
    let result = nombres.map(nombres =>{
        return {nombre: nombres, numero: num++};
    })
    return result;
};  


  //dada la siguiente estructura de datos sobre la facturacion de una serie de datos se pide calcular la facturacion total de cada usuario


  
  export const calcularFacturacionTotal = (facturas) => {
    const miFactura = {};
  
    facturas.forEach(factura => {
      if (miFactura[factura.nombre]) {
        miFactura[factura.nombre] += factura.monto;
      } else {
        miFactura[factura.nombre] = factura.monto;
      }
    });
  
    return miFactura;
  }


      //crear una funcion llamada eleccion delegado que le pase obligatoriamente como primer parametro un array, como segundo parametro un numero(numero de alumnos)
      //y automaticamente me generara un numero aleatorio entre 1 y el numero pasado como parametro ambos inckuidos, devolviendome el elemnto del array
      //que se encuentra en dicha posicion -1

    /**
     * @description : Genera un número aleatorio entre un mínimo y un máximo, incluidos ambos.
     * @param {Array} array 
     * @param {Number} numeroAlumnos 
     * @returns {String}
     */
      export const eleccionDelegado=(array=[],numeroAlumnos )=>{

        if(!Array.isArray(array) || typeof numeroAlumnos!== 'number' || numeroAlumnos < 1 || numeroAlumnos >= array.length){
       return 'Error';
        }else{
            const aleatorio = Math.floor(Math.random() * (array.length));
            return array[aleatorio];
        }


      };


      //dado un array de palabras quiero que se cuente cuantas vocales hay en total

      /**
       * @description : Cuenta la cantidad de vocales en todas las palabras del array.
       * @param {Array} palabras 
       * @returns {Number}
       */

      export const contarVocales = (palabras = []) => {
        let contador = 0;

        palabras.forEach(palabra => {
          const letras = palabra.toLowerCase().split('');
           
            letras.forEach(letras2 => {
              if(letras2.includes('a' || 'e' || 'i' || 'o' || 'u')){
                contador++;   
          }
        })

      })
      return contador;

    }


      //dado un array de palabras decid la palabra con mayor longitud 

      /**
       * @description Palabra con mayor longitud en un array de palabras.
       * @param {Array} palabras 
       * @returns {String}
       */

      export const palabraMasLarga = (palabras = []) =>{

        palabras.sort((a, b) => b.length - a.length);
        return palabras[0];
        
      }

      //dado un array de palabras eliminar las duplicadas

      /**
       * @description  : Elimina las palabras duplicadas en un array de palabras.
       * @param {Array} palabras 
       * @returns {Array}
       */

      export const eliminarDuplicados = (palabras = []) => {
        
        let nuevoArray = []; 
        palabras.forEach(palabra => {
          if(!nuevoArray.includes(palabra)){
            nuevoArray.push(palabra);
          }
        });
        return nuevoArray;
 
      }


      //dado un array de palabras crear un objeto cuya clave sea la palabra y el valor sea la cantidad de veces que aparece en el array


      export const contarPalabras = (palabras = []) => {

        let obj = {};
        palabras.forEach(palabra => {
          obj[palabra] = (obj[palabra] || 0) + 1;
        });
        return obj;

      }


      //Ejercicios relacion

      //1.

      /**
       * @description : Suma los elementos de dos arrays de igual tamaño.
       * @param {Array} array1 
       * @param {Array} array2 
       * @returns {Array}
       */


      export const sumaArrays = (array1 = [], array2 = [] ) =>{

         for(let i = 0; i < array1; i++){
            for(let j = 0; j < array2.length; j++){
              array1[i] += array2[j];
            }
         }
         return array1;
      };


      //2.

      /**
       * @description : elimina las palabras duplicadas en un array de palabras.
       * @param {Array} array 
       * @returns {Array}
       */

      export const eliminarDuplicados2 = (array = []) => {

        let nuevoArray = []; 
        palabras.forEach(palabra => {
          if(!nuevoArray.includes(palabra)){
            nuevoArray.push(palabra);
          }
        });
        return nuevoArray;
      }


      //3.

      /**
       * @description : Filtra los elementos pares de un array.
       * @param {Array} array 
       * @returns {Array}
       */

      export const filtrarPares = (array = []) => {
        let nuevoArray = [];

        array.filter(pares => pares % 2 === 0)
          nuevoArray.push(pares);
        

        return nuevoArray;
      }



      //4.

      /**
       * @description : Unifica varios arrays en uno solo.
       * @param  {Array} arrays 
       * @returns {Array}
       */


      export const unirArray = (...arrays) => {
        return arrays.reduce((acumulador, arrayActual) => acumulador.concat(arrayActual), []);
      }


      //5.


      /**
       * @description : Cuenta la cantidad de palabras en una cadena.
       * @param {String} cadena 
       * @returns {Object}
       */


      export const conteoPalabras = (cadena) => {
        const palabras = texto.split(' ');
        const contador = {};
      
        palabras.forEach(palabra => {
          if (palabra) {
            contador[palabra] = (contador[palabra] || 0) + 1;
          }
        });
      
        return contador;
      };


      //6.

      /**
       * @description : Ordena un array de números en orden ascendente.
       * @param {Array} array 
       * @returns {Array}
       */

      export const ordenarNumeros = (array = []) => {
        array.sort((a, b) => a - b);
      }



      //7.

      /**
       * @description : Elimina un elemento de un array.
       * @param {Array} array 
       * @param {String} elemento 
       * @returns { Array}
       */

      export const eliminarElemento = (array = [], elemento) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === elemento) {
            array.splice(i, 1); 
            break; 
          }
        }
        return array;
      }


      //8.

      /**
       * @description : Calcula el max y min de un array
       * @param {Array} array 
       * @returns {Number}
       */

      export const encontrarMaxMin = (array = []) => {

        let max = Math.max(array);
        let min = Math.min(array);

        return ` el max es ` + max + ` y el min es ` + min;
      };


      /**
       * @description : Busca un elemento en un array y devuelve su posición.
       * @param {Array} array 
       * @param {Number} elemento 
       * @returns {Number}
       */

      //9.


      export const buscarElemento = (array = [], elemento) => {
        let i = 0;
          while (i < arr.length) {
            if (arr[i] === elemento) {
              return i; 
                }
              i++;
          }
          
        return -1;
    }
          

    /**
     * @description : Divide un array en fragmentos de un tamaño determinado.
     * @param {Array} arr 
     * @param {Number} tamano 
     * @returns {Array} 
     */

    //10.
    function dividirFragmento(arr, tamano) {
      const resultado = [];
      
      for (let i = 0; i < arr.length; i += tamano) {
        resultado.push(arr.slice(i, i + tamano));
      }
    
      return resultado;
    }


    //11.

      /**
      * @description : Mapea cada elemento del array con una función proporcionada y devuelve un nuevo array con los resultados.
      * @param {Array} arr 
      * @param {Function} funcion 
      * @returns {Array}
      */

      export const mapearNumeros = (arr, funcion) => {
        let array = arr.map(funcion);
        return array;
        };

    //12.

          
      /**
       * @description : Combina dos objetos en uno nuevo.
       * @param {Array} obj1 
       * @param {Array} obj2 
       * @returns {Array}
       */
      export const combinarObjetos = (obj1, obj2) => {
        return {...obj1,...obj2};
      }


    //13.
            
      /**
       * @description : Extrae las propiedades de un objeto según un array.
       * @param {Array} obj 
       * @param {Array} propiedades 
       * @returns {Array}
       */

      export const extraerPropiedades = (obj , propiedades = []) => {
        let array = {};
        propiedades.forEach(propiedad =>{
            if(obj[propiedad] !== undefined){
                array[propiedad] = obj[propiedad];
            }
        })
        return array;
      }

    //14.

        /**
         * @description : Crea un array con todos los números del rango especificado.
         * @param {Number} min 
         * @param {Number} max 
         * @returns {Array}  Devuelve un array con todos los números del rango especificado.
         */

        export const rangoNumeros=(min, max) => {
          let array = [];
          let i = min;

          while (i <= max) {
            array.push(i);
            i++;
          }
        };


    //15.

        /**
         * @description : Inverte una cadena de texto.
         * @param {String} cadena 
         * @returns {String}
         */
        export const invertirCadena=(cadena) => {
          let separarCadena = cadena.split("");
          let invertirCadena = separarCadena.reverse();
          let cadenaInvertida = invertirCadena.join("");
          return cadenaInvertida;
        }

    //16.

        /**
         * @description : Convierte una cadena de texto a mayúsculas.
         * @param {String} cadena 
         * @returns {String}
         */
        
        export const capitalizarPalabras=(cadena) => {
          cadena = cadencia.split("");
          cadena[0] = cadena[0].toUpperCase();
          let palabras = cadena.join("");
          return palabras;
        };


    //17.

        
        /**
         * @description : Multiplica una matriz por un escalar.
         * @param {Array} matriz 
         * @param {Number} escalar 
         * @returns {Array}
         */

        export const multiplicarRaizPorEscalar =(matriz, escalar) => {
          const result = [];
          let i = 0;
          while (i < matriz.length) {
              const resultado= [];
              let j = 0;
          while (j < matriz[i].length) {
              resultado.push(matriz[i][j] * escalar);
              j++;
          }
          result.push(resultado);
          i++;
          }
          return result;

        };


    //18.

                  
          /**
           * @description : Ordena numeros en un array.
           * @param {Array, String}
           * @returns {Array}
          */
          export const combinarArrays=(orden , ...arrays) => {
            // Combinar todos los arrays en uno solo
            let combinado = arrays.flat();

            // Ordenar el array en función del parámetro
            if (orden === "creciente") {
              combinado.sort((a, b) => a - b);
            } else if (orden === "decreciente") {
              combinado.sort((a, b) => b - a);
            } else {
              return "El parámetro debe ser 'creciente' o 'decreciente'.";
            }

            return combinado;
          }



    //19.

          
          /**
           * @description : Determina si una palabra es un palíndromo.
           * @param {String} palabra 
           * @returns {Boolean}
           */


          export const esPalindromo=(palabra) => {
            let palabraLimpia = palabra.toLowerCase();

          let sinEspacios = '';
            
          let i = 0;

          while (i < palabraLimpia.length) {
            if (palabraLimpia[i]!=='') {
              sinEspacios += palabraLimpia[i];
            }
            i++;
          }

          // Comparar la palabra original con su versión invertida
          let palabraInvertida = sinEspacios.split('').reverse().join('');
          if (sinEspacios === palabraInvertida) {
            return true;
          }else{
            return false;
          }
          }



    //20.
            
          /**
           * @description realiza la diferencia entre dos arrays.
           * @param {Array} 
           * @param {Array} 
           * @returns {Array}
           */

          export const diferenciaArrays=(array1, array2) => {
            let diferenciaArrays = [];

            array1.forEach(elemento1 => {
              if (!array2.includes(elemento1)) {
                diferenciaArrays.push(elemento1);
              }
            });

            array2.forEach(elemento2 => {
              if (!array1.includes(elemento2)) {
                diferenciaArrays.push(elemento2);
              }
            });
          }
  

      //21.


          export const rotarArray = (array= [], pasos) => {

           let rotacion = pasos % array.length;

           let parte1 = array.slice(-rotacion);
           let parte2 = array.slice(0,array.length - rotacion);

           return parte2.concat(parte1);
          }





          //DESTRUCTURING

          //Ejercicio
           /* const numeros = {
              data: {
                  primerNumero:10,
                  segundoNumero:20,
              },
            };

            const {primerNumero, segundoNumero} =numeros.data
            console.log(primerNumero, segundoNumero);
            */
            //Ejercicio3
            //Dada la siguiente estructura 
            /*
            const persona = {
              id:23,
              info: {
                  nombre: "Maria",
                  apellidos: "Jimenez",
                  edad: 25,
              },
            };
            */
            //Saca las variables nombres y apellidos y si la propiedad apellido no existe que ponga por defecto desconocido en apellido

            //const {nombre,apellidos = "desconocido"} = persona.info;
            //console.log(nombre,apellidos);

            //Ejercicio4
            //Dada el siguiente objeto

            /*

            const persona = {
              nombre: 'Carlos',
              amigos: ['Ana','David','Pepe'],
            };

            //Extraer el nombre de la persona y el primer amigo de la lista

            const {nombre,amigos} = persona
            console.log(nombre,amigos[0]);

            */

            //Ejercicio5
            //Dada la estructura de datos de los usuarios de jsonPlaceholder
            //se pide crear una funcion que me genere un resumen mostrandome el nombre de usuario el email la ciudad y 
            //la website de todos los usuarios que le pasemos en un array. 
            //Obligatorio la desectructuracion de objetos para la ejecucion del ejercicio

            export const EjercicioPruebaDestructuring = (array) => {
              array.forEach(({ username, email, address: { city }, website }) => {
                  return `usuario: ${username}, email: ${email}, address: ${city}, website: ${website}`;
              });
          };


            //Ejercicio
            //Crear una funcion llamada buscarCiudad que le pasemos como parametro mi array de data y la ciudad que 
            //quiero buscar y me devuelva el nombre de usuario y el email y la geolocalización


            //Dado el siguiente array de objetos se pide.
            //crear una funcion llamada savaLocalStorage que le pase como parametro un array y como segundo una cadena de texto(clave).
            //Automaticamente realizara las siguientes acciones: comprobara si existe la clave en el localStorage 
            //si existe mensaje sino almacena los datos del array en el localStorage
            
            

            export const saveLocalStorage = (array = [], cadena) => {

             if(!Array.isArray(array) || typeof cadena !== "string" || localStorage.hasOwnProperty(cadena)){
              return "Error: Array o cadena vacia o ya existe la clave en el localStorage";
             }
              localStorage.setItem(cadena, JSON.stringify(array))
            }


            //crear una funcion que le pase como parametro una clave (cadena )
            //- comprueba que le he pasado como parametro una cadena de texto
            //- verifica si la cadena de texto en una clave del localStorage. Sino es una ckave mensaje de error y si si existe lo carga en el console.log

            export const verifica = (cadena) => {
              if (typeof cadena === 'string') {
                const valor = localStorage.getItem(cadena); // Obtener el valor del localStorage
                if (valor !== null) {
                  try {
                    // Intentar parsear como JSON
                    const parsedValue = JSON.parse(valor);
                    return parsedValue; // Si se puede parsear, mostrarlo en la consola
                  } catch (error) {
                    // Si no es JSON válido, mostrar el valor tal cual
                    return valor;
                  }
                } else {
                  return "Error: No existe la clave en el localStorage";
                }
              } else {
                return "Error: Parámetro inválido";
              }
            };
            

            //Crear una funcion que le pase como parametro una clave (cadena), un string(texto a buscar) y automaticamente realice las siguientes opciones
            //Buscara dentro de la clave del localStorage el elemento que le pasemos como segundo parametro
            
            export const buscarCadena = (cadena, textoBuscar) => {
            
              if(localStorage.hasOwnProperty(cadena)){
                const valor = localStorage.getItem(cadena);
                if (valor!== null) {
                  try {
                    const parsedValue = JSON.parse(valor);
                    const elementoBuscado = parsedValue.find(element => element.nombre === textoBuscar);
                    if(elementoBuscado){
                      return elementoBuscado;
                    }else{
                      return "No se ha encontrado el elemento";
                    }
                  } catch (error) {
                    return "Error al parsear el valor";
                  }
                } else {
                  return "Error: No existe la clave en el localStorage";
                }
              }
            }


            //Crear una funcion modify localStorage que le pase como parametro una clave, como segundo newId y tercero usuario y buscara si existe la clave id modificara la id del usuario

            export const modifyLocalStorage = (cadena, newEdad, username) => {

              if(localStorage.hasOwnProperty(cadena) || typeof username !== 'string' || typeof newId !== 'number'){
                return "Error: Parametros invalidos";
              }

              const newData = [];

              const miData = JSON.parse(localStorage.getItem(cadena))
              miData.forEach((element)=>{
                if(element.nombre === username){
                  element.edad = newEdad
                }
                newData.push(miData);
              })
            }


            //1. Guardar y Recuperar un Array de Objetos: Crea una función que acepte
            // un array de objetos (con nombre y edad), guarde este array en
            // LocalStorage y luego lo recupere. Verifica si el array ya está guardado y
            // evita duplicados

            

            export const guardarPersonas = (arrayObjetos) => {
              
              let personasNuevas = JSON.parse(localStorage.getItem('personas')) || [];

              arrayObjetos.forEach(person => {
                if (!personasNuevas.some(p => p.nombre === person.nombre && p.edad === person.nombre)) {
                  personasNuevas.push(person);
                }
              })

              localStorage.setItem('personas', JSON.stringify(personasNuevas));
            }

            export const recuperarPersonas = (arrayObjetos) => {
              return JSON.parse(localStorage.getItem('personas')) || [];
            }
                      


            // 2. Validar Datos antes de Guardar en LocalStorage: Crea una función que
            // acepte un array de objetos, donde cada objeto tiene nombre y edad .
            // Valida que nombre sea una cadena no vacía y edad sea un número
            // mayor que 0 antes de almacenarlo en LocalStorage .

            export const ValidarLocalStorage = (array) => {
              array.forEach(person =>{
                if(typeof person.nombre == 'string'){
                  if(person.nombre.trim()!== ''){
                    if(typeof person.edad == 'number' && person.edad > 0){
                      localStorage.setItem('personas', JSON.stringify(array));
                    }
                    else{
                      console.log('La edad debe ser un número mayor que 0');
                    }
                  }else{
                    console.log('El nombre no puede ser vacío');
                  }
                }else{
                  console.log('El nombre debe ser una cadena');
                }
              })
              }

            // Actualizar un Objeto dentro del Array en LocalStorage: Crea una
            // función que permita actualizar la edad de una persona en un array de
            // objetos almacenado en LocalStorage , buscando a la persona por
            // nombre.

            export const actualizarLocalStorage = ( array, nombre, nuevaEdad) => {
              let personas = JSON.parse(localStorage.getItem("personas"));
            
              if (personas) {
                const personaEncontrada = personas.find(persona => persona.nombre === nombre);
            
                if (personaEncontrada) {

                  personaEncontrada.edad = nuevaEdad; 

                  localStorage.setItem("personas", JSON.stringify(personas));
                  console.log(`La edad de ${nombre} se ha actualizado a ${nuevaEdad}.`);
                } else {
                  console.log(`No se encontró a la persona con el nombre: ${nombre}.`);
                }
              } else {
                console.log("No hay datos en localStorage.");
              }
            };

            //4. Eliminar un Objeto del Array en LocalStorage: Crea una función que
            // permita eliminar un objeto del array almacenado en LocalStorage ,
            // buscando por el nombre de la persona.

            export const eliminarLocalStorage = (array, nombre) => {
              if (!nombre) {
                  console.log('Debes proporcionar un nombre.');
                  return;
              }
          
              localStorage.setItem('personas', JSON.stringify(array));
          
              // Recuperar el array de personas
              let personas = JSON.parse(localStorage.getItem("personas"));
          
              if (!personas || personas.length === 0) {
                  console.log('No hay personas en LocalStorage');
                  return;
              }
          
              const personaEncontrada = personas.filter(persona => persona.nombre !== nombre);
          
              //Este if nos indica que el filter ha creado el nuevo array sin nombre 
              //proporcionado por lo que ha sido eliminado y su capacidad
              //debe ser menor que al de el array original
              if (personaEncontrada.length < personas.length) {
                  localStorage.setItem("personas", JSON.stringify(personaEncontrada));
                  console.log(`Persona ${nombre} eliminada.`);
              } else {
                  console.log(`No se encontró a la persona ${nombre}.`);
              }
          }
          


            //5. Mostrar los Datos en el DOM: Crea una función que recupere el array de
            // objetos almacenado en LocalStorage y muestre los datos en una lista
            // dentro de un <div> con el id app .

            export const mostrarDatosDOM = () => {
              let personas = JSON.parse(localStorage.getItem('personas'));

              const app = document.getElementById('app');
              const lista = document.createElement('ul');

              personas.forEach(obj =>{
                const li = document.createElement('li');
                li.textContent = `${obj.nombre} - ${obj.edad}`;
                lista.appendChild(li);
              })

              app.innerHTML="";
              app.appendChild(lista);


            }

            // 6. Guardar un Set en LocalStorage: Crea una función que acepte un Set
            // de números, lo convierta a un array para almacenarlo en LocalStorage ,
            // y luego lo recupere y lo convierta nuevamente en un Set .


            export const guardarSet = (set) => {
               const array = [...set];

               localStorage.setItem('numeros', JSON.stringify(array));

               const recuperado = JSON.parse(localStorage.getItem('numeros'));
               const setRecuperado = new Set(recuperado); 
               return setRecuperado;

            }

            // 7. Guardar y Recuperar un Map en LocalStorage: Crea una función que
            // acepte un Map , lo convierta a un array de pares clave-valor, lo almacene en
            // LocalStorage y luego lo recupere y vuelva a convertir en Map .

            export const guardarMap = (map) => {

              const array = Array.from(map);

              localStorage.setItem('Map', JSON.stringify(array));

              const recuperado = JSON.parse(localStorage.getItem('Map'));
              const mapRecuperado = new Map(recuperado); 
              return mapRecuperado;

            }

            // 9. Validación de Datos con Operadores Ternarios: Crea una función que
            // acepte un array de objetos, donde cada objeto tiene nombre y edad . Si
            // algún objeto tiene un nombre vacío o una edad menor a 18, no lo
            // almacena en LocalStorage y devuelve un mensaje indicando qué
            // objetos son inválidos.

            export const validarOperadoresTernarios = (array) => {
              const validos = array.filter(element => {
                if (element.nombre.trim() === '' || element.edad < 18) {
                  //trim elimina los espacios en blanco
                  console.log(`El objeto ${JSON.stringify(element)} es inválido.`);
                  return false; // No incluir en el array filtrado
                } else {
                  console.log(`El objeto ${JSON.stringify(element)} es válido.`);
                  return true; // Incluir en el array filtrado
                }
              });

              //En esta funcion como se almacena en una variable el filter cuando se devuelve true se añade

              // Solo almacenar el array filtrado en LocalStorage si hay elementos válidos
              if (validos.length > 0) {
                localStorage.setItem('personas', JSON.stringify(validos));
                console.log('Los objetos válidos se han almacenado correctamente.');
              } else {
                console.log('No hay objetos válidos para almacenar.');
              }
            };

            // 10. Actualización Condicional en LocalStorage con Funciones: Crea una
            // función que acepte un array de objetos y almacene solo aquellos objetos
            // cuyo nombre no esté ya almacenado en LocalStorage . Usa una función
            // para verificar la existencia y almacenar los nuevos objetos.

            export const actualizarLocalStorageCondicional = (array) => {
              const personas = JSON.parse(localStorage.getItem('personas')) || [];
            
              // Filtrar solo los nuevos objetos que no tienen nombre ya existente en 'personas'
              const nuevos = array.filter(element => {
                const yaExiste = personas.some(persona => persona.nombre === element.nombre);
                if (yaExiste) {
                  console.log(`El objeto ${JSON.stringify(element)} ya existe.`);
                  return false;
                } else {
                  console.log(`El objeto ${JSON.stringify(element)} es válido.`);
                  return true;
                }
              });
            
              // Agregar solo los nuevos objetos al almacenamiento
              if (nuevos.length > 0) {
                const definitivo = [...personas, ...nuevos];
                localStorage.setItem('personas', JSON.stringify(definitivo));
                console.log('Los objetos nuevos se han almacenado correctamente.');
              } else {
                console.log('No hay objetos nuevos para almacenar.');
              }
            };
            
            




            
            

        
      
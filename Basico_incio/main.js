import { saveLocalStorage,actualizarLocalStorageCondicional,validarOperadoresTernarios,guardarSet,guardarMap ,eliminarLocalStorage , verifica, buscarCadena, guardarPersonas, recuperarPersonas, ValidarLocalStorage, actualizarLocalStorage  } from './helpers/script.js';


const usuario = [
    {nombre:"junaiiii", edad:9},
    {nombre:"Pedro", edad:66},
    {nombre:"Juan", edad:30},
    {nombre:"paco", edad:90}
  ];

  const miMapa = new Map([
    ['nombre', 'Libro A'],
    ['descripcion', 'Autoayuda'],
    ['precio', 15.99]
]);

actualizarLocalStorageCondicional(usuario);



  //Preguntar si el ejercicio 3 esta bien hecho, ya que es necesario que antes haya algo en el localStorage para asi guardar




// localStorage.setItem("libro", JSON.stringify({ titulo: "Los cuatro acuerdos", autor: "Don Miguel Ruiz" }));
// localStorage.setItem("mensaje", "Este es un simple texto");

/*

console.log(verifica("libro")); // Debería mostrar el objeto parseado
console.log(verifica("claveInexistente")); // Debería mostrar el mensaje de error
console.log(verifica("mensaje"));  // Debería mostrar el texto simple
console.log(verifica(123));  // Debería mostrar el error de parámetro inválido
*/



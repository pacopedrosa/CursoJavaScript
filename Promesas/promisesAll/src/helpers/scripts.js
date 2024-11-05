/**
 * Funcion getUsers que realiza una peticion a una API
 * https://jsonplaceholder.typicode.com/todos
 */

const urlData = import.meta.env.VITE_APIS_URL;

export const fetchDataUsersPromise = () => {

   return fetch(urlData)
        .then((response) =>{
            if(!response.ok){
                throw new Error("Error en la peticion");
            }
            console.log(response);
            return response.json();
          })    
          .then((data) => { return data    })

        .catch((error) => { console.log("Error", error) });

};



export const fetchDataUsersAsync = async () => {
    try {
        const response = await fetch(urlData);
        if (!response.ok) {
            throw new Error("Error en la peticion");
        }
        const data = await response.json();
        console.log("La data es: ",data);

    } catch (error) {
        
    }
}

//https://swapi.dev/api/people/
//https://starwars-visualguide.com/#/characters?page=1

//crear dos funciones una con promesas y otra con async await  que obtenga los personajes de star wars(nombre, altura) y la imagen(url)
//y guardar la info en localStorage

export function obtenerPersonajesPromesa() {
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => {
        const personajes = data.results.map(personaje => ({
          nombre: personaje.name,
          altura: personaje.height,
          imagen: `https://starwars-visualguide.com/assets/img/characters/${extraerId(personaje.url)}.jpg`
        }));
        localStorage.setItem('personajesSW', JSON.stringify(personajes));
        console.log('Personajes guardados en localStorage:', personajes);
      })
      .catch(error => console.error('Error al obtener los personajes:', error));
  }
  
  export function extraerId(url) {
    const partes = url.split('/');
    return partes[partes.length - 2];
  }
  
  export async function obtenerPersonajesAsync() {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
  
      const personajes = data.results.map(personaje => ({
        nombre: personaje.name,
        altura: personaje.height,
        imagen: `https://starwars-visualguide.com/assets/img/characters/${extraerId(personaje.url)}.jpg`
      }));
  
      localStorage.setItem('personajesSW', JSON.stringify(personajes));
      console.log('Personajes guardados en localStorage:', personajes);
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
    }
  }
  
  
  const urlDataNombre = import.meta.env.VITE_API_URL_NAME;
  const urlDataImg = import.meta.env.VITE_API_URL_IMG;
  
  export async function fetchDatosAsync(){
    try {
      // Ejecutar ambas promesas al mismo tiempo
      const [responseNombre, responseImg] = await Promise.all([
        fetch(urlDataNombre),
        fetch(urlDataImg)
      ]);
  
      // Verificar ambas respuestas
      if (!responseNombre.ok) {
        throw new Error(`No se pudo recoger los datos de la API Nombre: ${responseNombre}`);
      }
      if (!responseImg.ok) {
        throw new Error(`No se pudo recoger los datos de la API Imagen: ${responseImg}`);
      }
  
      // Procesar la respuesta de los nombres (API de personajes)
      const dataNombre = await responseNombre.json();
      const datos = [...dataNombre['results']];
      const characters = datos.map((dato, index) => ({
        name: dato['name'],
        altura: dato['height'],
        imageId: index + 1 // Para usarlo en la generación de URLs de imágenes
      }));
  
      // Introducir los datos en el localStorage
      localStorage.setItem('starwarsAsync', JSON.stringify(characters));
  
      // Renderizar los personajes
      renderCharacter(characters);
    } catch (error) {
      console.error("Error ", error);
    }
  }
  
  async function renderCharacter (characters){
    // 1º - Seleccionar la etiqueta DIV donde vamos a renderizar los personajes
    const resultDiv = document.getElementById('app');
    resultDiv.innerHTML = ""; // <--- Limpiamos el contenido del div
  
    // 2º - Iteramos sobre el array de characters
    characters.map((character) => {
      // Creamos un div para cada personaje
      const characterDiv = document.createElement('div');
      characterDiv.className = "character";
  
      // Inyectar datos
      
      characterDiv.innerHTML = `
      <div class="character-card">
      <div class="card-image">
        <img src="${urlDataImg}${character.imageId}.jpg" alt="${character.name}" width="200px">
        </div>
        <div class="card-content">
        <h2>${character.name}</h2>

        <p>Altura: ${character.altura}</p>
        </div>
        </div>
      `;
  
      // Añadimos el characterDiv (hijo) al resultDiv (padre)
      resultDiv.appendChild(characterDiv);
    });
  }
  

  const urlDataNombre1 = import.meta.env.VITE_API_URL_NAME; // Importa la URL desde el archivo .env

export async function fetchAllCharacterPromisesAll() {
  try {
    console.time("fetchAllCharacterPromisesAll");

    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Cargando personajes...";
    document.getElementById("app").appendChild(loadingIndicator);

    const promisePagesArray = [];

    // Crear promesas para cada página
    for (let i = 1; i <= 9; i++) {
      promisePagesArray.push(
        fetch(`${urlDataNombre1}?page=${i}`)
          .then(response => {
            const contentType = response.headers.get("content-type");
            if (!response.ok || !contentType.includes("application/json")) {
              throw new Error("Respuesta no válida o no es JSON");
            }
            return response.json();
          })
      );
    }

    // Ejecutar todas las promesas
    const resultPromiseAll = await Promise.all(promisePagesArray);
    console.log("Resultado de Promise.all:", resultPromiseAll);

    // Reducir resultados a un solo array de personajes
    const allCharacters = resultPromiseAll.reduce((acc, page) => {
      return acc.concat(page.results);
    }, []);

    // Almacenar en LocalStorage y eliminar el indicador de carga
    localStorage.setItem("starwarsPromisesAll", JSON.stringify(allCharacters));
    loadingIndicator.remove();
    renderCharacter(allCharacters);

  } catch (e) {
    console.error("Error", e);
  }

  console.timeEnd("fetchAllCharacterPromisesAll");
}

  
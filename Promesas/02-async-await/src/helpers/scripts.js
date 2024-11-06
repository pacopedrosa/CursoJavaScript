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
      try{
          //Extraer datos de la API
          const response = await fetch(urlDataNombre);
          if(!response.ok){
              throw new Error(`No se pudo recoger los datos de la API: ${response}`);
          }
          const data = await response.json()
          const datos = [...data['results']]
          const characters = Array();
          for(let i = 0; i < datos.length; i++){
              characters[i] = { name : datos[i]['name'], altura : datos[i]['height']};
          }
          //Introducir los datos en el localstorage
          localStorage.setItem('starwarsAsync', JSON.stringify(characters));
          renderCharacter(characters);
      }catch(error){
          console.error("Error ", error);
      }
  }
  
  async function renderCharacter (characters){
      // 1º - Seleccionar la etiqueta DIV donde vamos a renderizar los personajes
      const resultDiv = document.getElementById('app');
      resultDiv.innerHTML = ""; // <--- Limpiamos el contenido del div
  
      // 2º - Iteramos sobre el array de characters
      characters.map((character, index) => {
          const characterId = index + 1;
  
          //Creamos un div para cada personaje
          const characterDiv = document.createElement('div');
          characterDiv.className="character";
  
          //Inyectar datos
          characterDiv.innerHTML = `
          <h2>${character.name}</h2>
          <img src="${urlDataImg}${characterId}.jpg" alt="${character.name}" width="200px">
          <p>Altura: ${character.altura}</p>
          `;
          
          //añadimos el characterDiv (hijo) al resultDiv (padre) ---> Con appendChild le decimos que character div es el hijo y con eso ya estariamos insertadolo en el div padre
          resultDiv.appendChild(characterDiv);
      });
  }

  //Lanzar un array de promesas






  //EJERCICIOS DE REPASO DE ANTES DEL EXAMEN

  export const fetchUserDataWithPromises = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if(!response.ok){
        throw new Error('Error en la petición');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data obtenida:', data);
      localStorage.setItem('usuarios', JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  export const fetchUserDataWithAsyncAwait = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if(!response.ok){
        throw new Error('Error en la petición');
      }
      const data = await response.json();
      console.log('Data obtenida:', data);
      localStorage.setItem('usuarios', JSON.stringify(data));
    } catch(error) {
      console.error('Error:', error);
    }
  }

  export const fetchPostWithError = () => {
    const error = new Set();
    fetch('https://jsonplaceholdwwefw.com/api')
    .then(response => {
      if(!response.ok){
        throw new Error('Error en la petición');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data obtenida:', data);
    })
    .catch(err => {
      error.add(err);
      console.log('Errores:', error);
    });
  }

  export const fetchPostWithErrorAsync = async () => {
    const error = new Set();
    try{
      const response = await fetch('https://jsonplaceholderwwefw.com/api');
      if(!response.ok){
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      console.log('Data obtenida:', data);
    }catch(err){
      error.add(err.message);
      console.log('Errores:', Array.from(error));
    }
  }


  export const fetchMultipleResourceWithAll = async () => {
    const temporizador = Date.now();
    try{

      const [users, posts, comments] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json),
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json),
        fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json),
      ])

      const resources = new Map();
        resources.set('users', users);
        resources.set('posts', posts);
        resources.set('comments', comments);

        const endTime = Date.now();
        console.log(`Tiempo: ${endTime-temporizador}ms`);
        return resources;
    }catch(err){
      console.error('Error:', err);
    }
  }

  export const fetchMultipleResourcesWithAllSettled = async () => {
    const startTime = Date.now(); // Inicio del temporizador

    const results = await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
        fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
        fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
    ]);

    const resourceNames = ['users', 'posts', 'comments'];

    const resources = new Map(
        results.map((result, index) => {
            const resourceName = resourceNames[index];
            const value = result.status === 'fulfilled' ? result.value : [];
            if (result.status === 'rejected') {
                console.error(`Error al obtener ${resourceName}:`, result.reason);
            }
            return [resourceName, value];
        })
    );

    const endTime = Date.now();
    console.log(`Tiempo con Promise.allSettled: ${endTime - startTime}ms`);

    return resources;
}


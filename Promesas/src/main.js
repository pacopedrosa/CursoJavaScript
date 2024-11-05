//Realizar una descarga de la data de los users que esta en mi web y mostrarla en consola

import { dataloginUsers, users } from "./data/data";
import { obtenerUsuarios, verificarLogin} from "./helpers/scripts";

/*obtenerUsuarios(users)
    .then(users =>{
        users.forEach(({ name, age }) =>{
            let tiempo=0;
            setTimeout(() =>{
                console.log(`Nombre: ${name}, Edad:${age}`);
            }, 1000*tiempo);
            ++tiempo;
        })
    })
    .catch(error =>{
        console.error(error);
    });
  */
 
    verificarLogin("username2", '5678', dataloginUsers)
    .then(({ miData, miUser }) => {  
        console.log(`Bienvenido: ${miUser} --> access: ${miData.access}`);
    })
    .catch((error) => {
        console.error(error);
    });


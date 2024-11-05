
//Promesa de la obtencion de los users

export const obtenerUsuarios = (users) => {
    return new Promise((resolve, reject) => {
        console.log("Carga de usuarios...");
        setTimeout(()=>{},3000);
        !Array.isArray(users) || users.length === 0? reject(new Error("No hay usuarios")) : resolve(users);
    });
}

//crear una app que verifique el login y passwd de un user usando promesas, si el login y passwd es ok mensaje de bienvenida y añadira al access
//dia-mes-año-hora-minuto. si no son correctos los credenciales error

export const verificarLogin = (username, password, datalogin) => {
    console.log("Cargando...");
    let fecha = new Date()
    let dia = fecha.getDay();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    let hora = fecha.getHours();
    let minuto = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let fechaAcceso = `${dia}-${mes}-${año}-${hora}-${minuto}.${segundos}`;
    return new Promise((resolve, reject) => {  
        setTimeout(() => {
            const userData = datalogin[username];
            if (userData && userData.password === password) {
                //insertar la fecha
                datalogin[username].access.push(fechaAcceso)
                resolve({ miData: userData, miUser: username });  
            } else {
                reject(new Error("Credenciales incorrectas"));
            }
        }, 3000);
    });
};

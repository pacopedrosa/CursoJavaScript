# Manual de promesas

### Estados de las promesas

> - Pendiente **(Pending)** : Es el estado inicial de una promesa que esta en progreso
> - Cumplida **(Fulfilled)** : La promesa se resuelve favorablemente y me devuelve un valor
> - Recahzada **(Rejected)** : La promesa no se resuelve y se deveulve un error


### Creacion de promesas

```javascript
const miPromesa = new Promise((resolve, reject)=> {
    //Aqui pongo el codigo que es asincrono
    if(condicion es ok){
        resolve(Lo que quiero devolver)
    }else{
        reject(new Error("Error al acceso a la web"));
    }
});
```

### Uso o consumo de las promesas

```javascript
miPromesa
    .then(data =>{
        console.log("La promesa ha sido correcta: ", data);
    })
    .catch(error =>{
        console.log("Error, promesa rechazada: ", error);
    })
```


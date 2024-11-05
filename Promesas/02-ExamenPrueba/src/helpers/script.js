const dataUrl = "http://localhost:3000/pokemons";
const multiplicadorUrl = "http://localhost:3000/multiplicador";
const carritoUrl = "http://localhost:3000/carrito"

//1. Obtener todas las cartas de pokemon

export const mostrarCartas = async () => {
    try{
        const response = await fetch(dataUrl);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Pokemons: ");
        let miMap = new Map();
        data.forEach(pokemon => {
            miMap.set(pokemon.nombre, pokemon);
        });
        return miMap;
        //preguntar si la data la quiere asi

    }catch(err){
        console.error("Error al obtener las cartas", err);
    }

}

// Función para agregar una carta al carrito
// helpers/script.js
export const agregarCartas = async (pokemon, cantidad = 1) => {
    try {
        // Obtén el carrito actual
        const carritoResponse = await fetch(`http://localhost:3000/carrito`);
        const carrito = await carritoResponse.json();

        // Busca si el Pokémon ya está en el carrito
        const itemExistente = carrito.items.find(item => item.id === pokemon.id);

        if (itemExistente) {
            // Si ya está en el carrito, solo actualiza la cantidad y el precio total
            itemExistente.cantidad += cantidad;
            itemExistente.precioTotal = itemExistente.cantidad * itemExistente.precioUnitario;
        } else {
            // Si no está en el carrito, agrega un nuevo ítem con todos los detalles
            carrito.items.push({
                id: pokemon.id,
                nombre: pokemon.nombre,
                cantidad: cantidad,
                precioUnitario: pokemon.precio,
                precioTotal: cantidad * pokemon.precio,
                habilidades: pokemon.habilidades,
                puntuacionTotal: pokemon.puntuacionTotal
            });
        }

        // Actualiza el total del carrito
        carrito.totalCarrito = carrito.items.reduce((acc, item) => acc + item.precioTotal, 0);

        // Realiza la actualización del carrito en db.json
        await fetch(`http://localhost:3000/carrito`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrito)
        });

        console.log(`Agregado al carrito: ${pokemon.nombre}, Cantidad: ${cantidad}`);
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
    }
};



export const filtrarPokemon = async (habilidad) => {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const resultadoMap = new Map();
        
        data.forEach((element) => {
            // Comprobar si el Pokémon tiene la habilidad buscada
            const tieneHabilidad = element.habilidades.some(hab => hab.nombre === habilidad);
            if (tieneHabilidad) {
                resultadoMap.set(element.id, element); // Almacenar en el Map con id como clave
            }
        });
        // Usamos Set para asegurarnos de que no haya duplicados
        const resultado = [...new Set(resultadoMap.values())];
        return resultado;
    } catch (err) {
        console.error("Error al filtrar pokemons", err);
    }
};




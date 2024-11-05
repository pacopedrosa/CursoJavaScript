import { agregarCartas,mostrarCartas,filtrarPokemon } from "./helpers/script";

const init = async () => {
    try {
        // Define el objeto Pokémon que quieres agregar
        const pokemon = {
            id: "1",
            nombre: "Pikachu",
            habilidades: [
                {
                    nombre: "Prueba Ataque",
                    puntuacion: 8
                },
                {
                    nombre: "Ataque Rápido",
                    puntuacion: 6
                }
            ],
            puntuacionTotal: 14,
            precio: 28
        };

        // Agrega el Pokémon al carrito con la cantidad deseada
        await agregarCartas(pokemon, 2);

        // Muestra el carrito actualizado
        const carritoResponse = await fetch("http://localhost:3000/carrito");
        const carritoActualizado = await carritoResponse.json();
        console.log("Carrito actualizado después de agregar:", carritoActualizado);
    } catch (error) {
        console.error("Error en init:", error);
    }
};

init();

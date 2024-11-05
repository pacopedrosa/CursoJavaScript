import { fetchAllCharacterPromisesAll } from "./helpers/scripts.js";

document.getElementById('fetchPersonajes').addEventListener('click', async () => {
    await fetchAllCharacterPromisesAll();
});

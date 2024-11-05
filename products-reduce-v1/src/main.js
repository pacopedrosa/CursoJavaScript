// importaciones librerias
import "./styles/tailwind.css" //importacion de estilos
//importaciones propias
import { products } from "./data/products.js";
import { calTotalPrice, productsIVA } from "./helpers/scripts.js";

//declaracion de variables

const appDiv = document.getElementById("app");

//inicio de ejecucion
appDiv.innerHTML =` ${products.map((product)=>`
    <div class="bg-pink-200 rounded-lg shadow-md p-6 transformation duration-300 hover:scale-95 hover:shadow-xl">
        <div class="w-full h-40 mb-6 owerflow-hidden">
            <img class="w-full h-full object-contain" src="${product.image}" alt="${product.name}">
            <h4 class="text-lg font-bold mb-1">${product.name}</h4>
            <h3 ">${product.price}</h3>
        </div>
    </div>
    `)
.join("")}
`;
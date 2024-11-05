//crear una funcion llamada calcularTotalPrice que obtenga el total de los productos incluyendo el IVA en cada producto. Debe pasarle como parametro un array de productos. Usando reduce
/**
 * @description Calcula el total de los productos incluyendo el IVA en cada producto
 * @param {Array} products 
 * @returns {Number}
 */
export const calcularTotalPrice = (products = []) => {
    let result = products.reduce((total, product) => {total = (total + product)*0.21})
    return result;

}

//crear un objeto llamado products-IVA que añada todos los elementos de product junto con el IVA de cada producto. A dicha funcion se le pasa como parametro un objeto
//product y un numero que sera el IVA
//esta funcion debe verificar que el objeto tiene la clave price. Usando reduce

export const productIVA = (products = [], iva) => {

    products.map((product) => {
        const priceIva = product.price * iva;
        product.priceIva = priceIva;
        return product;
    })
};
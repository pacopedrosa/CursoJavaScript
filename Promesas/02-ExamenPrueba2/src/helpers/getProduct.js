  /**
   * @description Trae los productos de una API
   * @param {String} urlProducts 
   * @returns {Promise<Array>} Data Products
   */
  export const getProducts = async (urlProducts) => {
    try{
    const response = await fetch(urlProducts)
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    }catch(err){
        console.log("Error:" + err.message);
    }
  }
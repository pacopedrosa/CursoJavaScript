

export const getProducts = async (urlProducts) =>{
    try {
        const response = await fetch(urlProducts);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataJson = await response.json();
        return dataJson;
        
    } catch (error) {
        console.log("Error:" + error.message);
    }

}
import axios from "axios";


const API_URL = 'http://localhost:5000/cart';

const getProductsInCart = async (token) => {
    try {
        const respon = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });
        return respon.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    }
};

export default getProductsInCart;

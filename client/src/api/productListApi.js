import axios from "axios";

const API_URL = 'http://localhost:5000/admin/product';

const getProducts = async () => {
    try {
        const respon = await axios.get(API_URL);
        return respon.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        throw error;
    }
};

export default getProducts;
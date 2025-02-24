import axios from "axios";
import apiConfig from '../config/apiConfig';

const API_URL = `${apiConfig.baseURL}product`;

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
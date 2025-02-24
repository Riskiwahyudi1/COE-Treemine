import axios from "axios";
import apiConfig from '../../config/apiConfig';

const API_URL = `${apiConfig.baseURL}admin/product/categories`;

const getCategories = async () => {
    try {
        const respon = await axios.get(API_URL);
        return respon.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export default getCategories;
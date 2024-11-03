import axios from "axios";

const API_URL = 'http://localhost:5000/admin/product/categories';

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
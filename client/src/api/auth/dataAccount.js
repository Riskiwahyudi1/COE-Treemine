import axios from "axios";
import apiConfig from '../../config/apiConfig';

const API_URL = `${apiConfig.baseURL}account`;

export const getDataAccount = async (token) => {
    try {
        const respon = await axios.get(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });
        return respon.data;
    } catch (error) {
        console.error('Error fetching Data:', error);
        throw error;
    }
};
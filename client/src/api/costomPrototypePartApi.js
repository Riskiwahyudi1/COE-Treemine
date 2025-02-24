import axios from "axios";
import apiConfig from '../config/apiConfig';

const API_URL = `${apiConfig.baseURL}costom-prototype`;

const getPartCostomPrototype = async () => {
    try {
        const respon = await axios.get(API_URL);
        return respon.data;
    } catch (error) {
        console.error('Error fetching part:', error);
        throw error;
    }
};

export default getPartCostomPrototype;
import axios from "axios";

const API_URL = 'http://localhost:5000/costom-prototype';

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
import axios from "axios";

const API_URL = 'http://localhost:5000/raja-ongkir';

const token = localStorage.getItem('token');

export const getProvinces = async () => {
    try {
        const respon = await axios.get(`${API_URL}/provinces`, {
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
export const getCities = async (provinceId) => {
    try {
        const response = await axios.get(`${API_URL}/cities?province_id=${provinceId}`);
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};
export const getSubdistricts = async (cityId) => {
    try {
        const response = await axios.get(`${API_URL}/subdistrict?city_id=${cityId}`);
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching subdistricts:", error);
        throw error;
    }
};
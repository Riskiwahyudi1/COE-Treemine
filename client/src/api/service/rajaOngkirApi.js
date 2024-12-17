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

export const getCost = async (couriers) => {
    try {
        // Pastikan untuk mengirimkan parameter couriers
        const response = await axios.get(`${API_URL}/calculate-cost`, {
            params: { couriers }, // Mengirimkan couriers sebagai parameter
            headers: {
                'Authorization': `Bearer ${token}`, // Pastikan token valid
            }
        });
        return response.data;  // Pastikan data yang diterima sesuai
    } catch (error) {
        console.error("Error fetching cost:", error);
        throw error;
    }
};

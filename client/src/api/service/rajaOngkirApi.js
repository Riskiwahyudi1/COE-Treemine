import axios from "axios";

const API_URL = 'http://localhost:5000/raja-ongkir';

const token = localStorage.getItem('token');

// semua provinsi
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

// detail provinsi user

// semua kota berdasarkan profinsi
export const getCities = async (provinceId) => {
    try {
        const response = await axios.get(`${API_URL}/cities?province_id=${provinceId}`);
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};

// biaya pengiriman
export const getCost = async (couriers, product) => {
    console.log(product)
    try {
       
        const response = await axios.get(`${API_URL}/calculate-cost`, {
            params: { couriers, product }, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            }
        });
        return response.data;  
    } catch (error) {
        console.error("Error fetching cost:", error);
        throw error;
    }
};

// provinsi spesifik user


import axios from "axios";

const API_URL = 'http://localhost:5000/account';

const token = localStorage.getItem('token');

export const getDataAccount = async () => {
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
import axios from "axios";

const API_URL = 'http://localhost:5000/transaction';

const token = localStorage.getItem('token');

export const getCostomPrototypeData = async (data) => {
    try {
        const respon = await axios.post(`${API_URL}`, data ,{
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });
        return respon;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const cancelTransaction = async (data) => {
    try {
        const respon = await axios.put(`${API_URL}/cancel`, data ,{
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });
        return respon;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const doneTransaction = async (data) => {
    try {
        const respon = await axios.put(`${API_URL}/done`, data ,{
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });
        return respon;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};

export const getTransaction = async (status) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: { status }, 
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching cost:", error);
        throw error;
    }
};
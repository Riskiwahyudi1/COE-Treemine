import axios from "axios";
import apiConfig from '../config/apiConfig';

const API_URL = `${apiConfig.baseURL}transaction`;
const API_URL_ADMIN = `${apiConfig.baseURL}admin/transaction`;

export const getCostomPrototypeData = async (data, token) => {
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
export const cancelTransaction = async (data, token) => {
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
export const doneTransaction = async (data, token) => {
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

export const getTransaction = async (status, token) => {
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


// admin
export const getTransactionAdmin = async (status, tokenAdm) => {
    try {
        const response = await axios.get(`${API_URL_ADMIN}`, {
            params: { status }, 
            headers: {
                'Authorization': `Bearer ${tokenAdm}`, 
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching cost:", error);
        throw error;
    }
};

export const approveTransaction = async (data, adminToken) => {
    try {
        const respon = await axios.put(`${API_URL_ADMIN}/approve`, data ,{
            headers: {
                'Authorization': `Bearer ${adminToken}`,  
            }
        });
        return respon;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};

export const rejectTransaction = async (data, adminToken) => {
    
    try {
        const respon = await axios.put(`${API_URL_ADMIN}/reject`, data ,{
            headers: {
                'Authorization': `Bearer ${adminToken}`,  
            }
        });
        return respon;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const sendTransaction = async (data, adminToken) => {
    try {
        const respon = await axios.put(`${API_URL_ADMIN}/send`, data ,{
            headers: {
                'Authorization': `Bearer ${adminToken}`,  
            }
        });
        return respon;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};


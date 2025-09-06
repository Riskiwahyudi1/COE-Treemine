import axios from "axios";
import apiConfig from '../config/apiConfig';

const API_URL = `${apiConfig.baseURL}admin/request-custom-assembly`;
const API_URL_BUYER = `${apiConfig.baseURL}costom-assembly`;

export const getCostomAssemblyData = async (token) => {
    try {
        const respon = await axios.get(`${API_URL_BUYER}/api/transaksi`,{
            headers: {
                'Authorization': `Bearer ${token}`,  
            }
        });
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getRequestCostomAssembly = async () => {
    try {
        const respon = await axios.get(`${API_URL}/review`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getWaitingPaymentAssembly = async () => {
    try {
        const respon = await axios.get(`${API_URL}/waiting-payment`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getAssemblyByProcess = async () => {
    try {
        const respon = await axios.get(`${API_URL}/process`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getAssemblyHistory = async () => {
    try {
        const respon = await axios.get(`${API_URL}/history`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};

export const getRequestAssemblyByParams = async (status, token) => {
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
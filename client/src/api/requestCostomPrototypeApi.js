import axios from "axios";
import apiConfig from '../config/apiConfig';

const API_URL = `${apiConfig.baseURL}admin/request-custom-prototype`;
const API_URL_BUYER = `${apiConfig.baseURL}costom-prototype`;


export const getCostomPrototypeData = async (token) => {
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
export const getRequestCostomPrototype = async () => {
    try {
        const respon = await axios.get(`${API_URL}/review`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getWaitingPaymentPrototype = async () => {
    try {
        const respon = await axios.get(`${API_URL}/waiting-payment`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getPrototypeByProcess = async () => {
    try {
        const respon = await axios.get(`${API_URL}/process`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};
export const getPrototypeHistory = async () => {
    try {
        const respon = await axios.get(`${API_URL}/history`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};

export const getRequestPrototypeByParams = async (status, token) => {
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
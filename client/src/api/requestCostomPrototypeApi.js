import axios from "axios";

const API_URL = 'http://localhost:5000/admin/request-costom-prototype';
const API_URL_BUYER = 'http://localhost:5000/costom-prototype';
const token = localStorage.getItem('token');

export const getCostomPrototypeData = async () => {
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
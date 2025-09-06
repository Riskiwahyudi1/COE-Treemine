import axios from "axios";
import apiConfig from '../../config/apiConfig';

const API_URL = `${apiConfig.baseURL}admin/dashboard`;

export const getPayments = async (adminToken) => {
    try {
        const respon = await axios.get(`${API_URL}/payment`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`, 
        }});
        return respon.data;
    } catch (error) {
        console.error('Error fetching Payments:', error);
        throw error;
    }
};
export const getTransaksi = async (adminToken) => {
    try {
        const respon = await axios.get(`${API_URL}/transaksi`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`, 
        }});
        return respon.data;
    } catch (error) {
        console.error('Error fetching Payments:', error);
        throw error;
    }
};
export const getTotalDataCosotom = async (adminToken) => {
    try {
        const respon = await axios.get(`${API_URL}/total-request-costom`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`, 
        }});
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};


import axios from "axios";

const API_URL = 'http://localhost:5000/admin/dashboard';

export const getPayments = async () => {
    try {
        const respon = await axios.get(`${API_URL}/payment`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching Payments:', error);
        throw error;
    }
};
export const getTransaksi = async () => {
    try {
        const respon = await axios.get(`${API_URL}/transaksi`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching Payments:', error);
        throw error;
    }
};
export const getTotalDataCosotom = async () => {
    try {
        const respon = await axios.get(`${API_URL}/total-request-costom`);
        return respon.data;
    } catch (error) {
        console.error('Error fetching request:', error);
        throw error;
    }
};


// src/hooks/useAxiosInstance.js
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Mengimpor AuthContext

const useAxiosInstance = () => {
    const { userToken, adminToken } = useAuth(); // Menggunakan hook useAuth

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true, // Untuk mengirim cookie
    });

    // Menambahkan token user untuk header Authorization
    axiosInstance.interceptors.request.use(
        (config) => {
            if (userToken) {
                config.headers['Authorization'] = `Bearer ${userToken}`;
            } else if (adminToken) {
                config.headers['Authorization'] = `Bearer ${adminToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosInstance; // Export hook

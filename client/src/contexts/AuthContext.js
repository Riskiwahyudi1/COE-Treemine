import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!localStorage.getItem('token'));

    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const [isAuthChecked, setIsAuthChecked] = useState(false);

    const [adminToken, setAdminToken] = useState(null);

    

    const loginUser = (token) => {
        localStorage.setItem('token', token); 
        setIsUserAuthenticated(true);
    };

   
    const logoutUser = () => {
        localStorage.removeItem('token'); 
        setIsUserAuthenticated(false);
    };

    const loginAdmin = (cookieToken) => {
        document.cookie = `adminToken=${cookieToken}; path=/; max-age=3600; SameSite=Lax`;
        setIsAdminAuthenticated(true);
    };

    const logoutAdmin = () => {
        document.cookie = 'adminToken=; Max-Age=0; path=/'; 
        setIsAdminAuthenticated(false);
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop().split(';').shift();
            return cookieValue;
        }
        return null;
    };

    const checkTokenExpiration = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; 
            return decoded.exp < currentTime; 
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; 
        }
    };

    useEffect(() => {
        const userToken = localStorage.getItem('token'); 
        const adminToken = getCookie('adminToken');
    
        if (userToken) {
            setIsUserAuthenticated(true);
        }

        if (adminToken) {
            if (checkTokenExpiration(adminToken)) {
                window.alert('Token Anda telah kedaluwarsa. Silakan login kembali.');
                setIsAdminAuthenticated(false);
                logoutAdmin();
            } else {
                setIsAdminAuthenticated(true);
                setAdminToken(adminToken);
            }
        }

        
        setIsAuthChecked(true);

         const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    logoutUser();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Hapus interceptor saat komponen unmount
            axios.interceptors.response.eject(interceptor);
        };

    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAdminAuthenticated,
                loginAdmin,
                logoutAdmin,
                isUserAuthenticated,
                loginUser,
                logoutUser,
                isAuthChecked,
                adminToken
                 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

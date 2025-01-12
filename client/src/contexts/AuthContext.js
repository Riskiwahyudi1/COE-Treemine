import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [adminToken, setAdminToken] = useState(null);

    const setCookie = (name, value, maxAge) => {
        document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    };

    const removeCookie = (name) => {
        document.cookie = `${name}=; Max-Age=0; path=/`;
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
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

    const loginUser = (token) => {
        setCookie('userToken', token, 7 * 24 * 60 * 60 * 1000); 
        setUserToken(token);
        setIsUserAuthenticated(true);
    };

    const logoutUser = () => {
        setCookie('authUserMessage', 'Sesi Anda telah berakhir. Silakan login kembali.', 10);
        removeCookie('userToken');
        setUserToken(null);
        setIsUserAuthenticated(false);
    };

    const loginAdmin = (token) => {
        setCookie('adminToken', token, 7 * 24 * 60 * 60 * 1000); 
        setAdminToken(token);
        setIsAdminAuthenticated(true);
    };

    const logoutAdmin = () => {
        setCookie('authAdminMessage', 'Sesi Anda telah berakhir. Silakan login kembali.', 10);
        removeCookie('adminToken'); 
        setIsAdminAuthenticated(false);
    };

    useEffect(() => {
        const userToken = getCookie('userToken');
        const adminToken = getCookie('adminToken');

        // Validasi token user
        if (userToken) {
            if (checkTokenExpiration(userToken)) {
                logoutUser();
            } else {
                setIsUserAuthenticated(true);
                setUserToken(userToken);
            }
        }

        // Validasi token admin
        if (adminToken) {
            if (checkTokenExpiration(adminToken)) {
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
                    const isTokenExpired = error.response.data?.message === 'Unauthorized: Token expired';
                    const role = error.response.data?.role; 

                    if (isTokenExpired) {
                        if (role === 'user') {
                            logoutUser();
                        } else if (role === 'admin') {
                            logoutAdmin();
                        }
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor); 
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isUserAuthenticated,
                loginUser,
                logoutUser,
                isAdminAuthenticated,
                loginAdmin,
                logoutAdmin,
                isAuthChecked,
                userToken,
                adminToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

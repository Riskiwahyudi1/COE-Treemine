import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!localStorage.getItem('token'));

    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const [isAuthChecked, setIsAuthChecked] = useState(false);

    console.log('isAdminAuthenticated', isAdminAuthenticated);

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

    useEffect(() => {
        const userToken = localStorage.getItem('token'); 
        const adminToken = getCookie('adminToken');
    
        if (userToken) {
            setIsUserAuthenticated(true);
        }
    
        if (adminToken) {
            setIsAdminAuthenticated(true);
        } 

        
        setIsAuthChecked(true);
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

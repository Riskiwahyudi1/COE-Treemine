import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Fungsi untuk login
    const login = (token) => {
        localStorage.setItem('token', token); // Simpan token di local storage
        setIsAuthenticated(true);
    };

    // Fungsi untuk logout
    const logout = () => {
        localStorage.removeItem('token'); // Hapus token dari local storage
        setIsAuthenticated(false);
    };

    // Efek untuk memeriksa token saat pertama kali render
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

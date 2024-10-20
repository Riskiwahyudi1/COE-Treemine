import React, { createContext, useContext, useState } from 'react';

// Membuat context
const AuthContext = createContext();

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
    const { isUserAuthenticated, isAuthChecked } = useAuth();

    if (!isAuthChecked) {
        return <div>Loading...</div>; 
    }

    return isUserAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

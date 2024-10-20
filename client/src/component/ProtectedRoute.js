import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ redirectTo = '/' }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

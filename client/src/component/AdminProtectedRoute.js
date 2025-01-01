import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminProtectedRoute = ({ redirectTo = '/admin-login' }) => {
    const { isAdminAuthenticated, isAuthChecked } = useAuth();

    // Tunggu hingga autentikasi selesai
    if (!isAuthChecked) {
        return <div>Loading...</div>; // Bisa diganti dengan spinner atau animasi
    }

    console.log('isAdminAuthenticated di route', isAdminAuthenticated);

    // Jika sudah terautentikasi, render Outlet, jika tidak, arahkan ke halaman login
    return isAdminAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default AdminProtectedRoute;

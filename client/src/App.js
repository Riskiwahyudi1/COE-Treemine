// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ResponsiveAppBar from './component/navbar';
import Footer from './component/footer';
import LoginPage from './component/login';
import RegisterPage from './component/regis';
import HomePage from './view/homepage';
import AdminHome from './Admin/adminHome';
import CustomPage from './view/pcbCustom'; 
import ProductPage from './view/shopCard'; 
import ServicePage from './view/service'; 
import ProductAssemblyPage from './view/productAssembly'; 
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Navbar hanya muncul jika bukan di halaman login atau admin */}
      {!isLoginPage && !isAdminPage && <ResponsiveAppBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Lindungi halaman admin dengan ProtectedRoute */}
        <Route >
          <Route path="/admin/*" element={<AdminHome />} />
        </Route>

        {/* Halaman yang memerlukan login */}
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/product-assembly" element={<ProductAssemblyPage />} />
          <Route path="/service" element={<ServicePage />} />
        </Route>
      </Routes>

      {/* Footer hanya muncul jika bukan di halaman login atau admin */}
      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}

export default App;

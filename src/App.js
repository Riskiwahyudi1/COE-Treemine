import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ResponsiveAppBar from './component/navbar';
import Footer from './component/footer';
import LoginPage from './component/login';
import RegisterPage from './component/regis';
import HomePage from './view/homepage';
import AdminHome from './Admin/adminHome';

// Import halaman tambahan
import CustomPage from './view/pcbCustom'; // Halaman Custom
import ProductPage from './view/shopCard'; // Halaman Product
import ServicePage from './view/service'; // Halaman Service
import ProductAssemblyPage from './view/productAssembly'; // Halaman Product Assembly

function App() {
  return (
    <Router>
      <AppContent />
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
        <Route path="/admin/*" element={<AdminHome />} />

        {/* Rute baru untuk halaman yang diminta */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/custom" element={<CustomPage />} />
        <Route path="/product-assembly" element={<ProductAssemblyPage />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>

      {/* Footer hanya muncul jika bukan di halaman login atau admin */}
      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}

export default App;

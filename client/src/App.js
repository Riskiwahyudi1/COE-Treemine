import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ResponsiveAppBar from './component/navbar';
import Footer from './component/footer';
import LoginPage from './component/login';
import RegisterPage from './component/regis';
import HomePage from './view/homepage';
import AdminHome from './Admin/adminHome';
import CustomPage from './view/pcbCustom';
import ProductPage from './view/shopCard';
import CustomPrototype from './view/customPrototype';
import ProductAssemblyPage from './view/customAssembly';
import ProtectedRoute from "./component/ProtectedRoute";
import AdminProtectedRoute from "./component/AdminProtectedRoute";
import DetailProduct from "./view/detailProduct";
import Keranjang from "./view/keranjang";
import KeranjangCostomProduct from "./view/keranjangCostomProduct";
import SidebarProfile from "./component/sidebarUser";
import ChangePassword from './view/changePassword';
import ForgotPassword from './view/forgotPassword';
import ResetPassword from './view/resetPassword';
import UserPage from './view/userPage';
import Transaksi from './view/transaksi';
import Review from './view/review';
import Checkout from './view/checkout';
import LoginAdmin from './component/loginAdmin';
import ProfileSettings from './view/setingProfile';



function App() {
  return (
    <Router>
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isForgotPassword = location.pathname === '/forgot-password' ;
  const isResetPassword = location.pathname.startsWith('/reset-password');
  const isProfilePage = location.pathname.startsWith('/user') ||
    location.pathname === '/change-password' ||
    location.pathname === '/proses' ||
    location.pathname === '/finish' ||
    location.pathname === '/cancle' ||
    location.pathname === '/transaksi'  ||
    location.pathname === '/review'; 

  return (
    <>
      {/* Navbar hanya muncul jika bukan di halaman login, admin, dan profile */}
      {!isLoginPage && !isAdminPage && !isProfilePage && !isForgotPassword && !isResetPassword && <ResponsiveAppBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-login" element={<LoginAdmin />} />        
        <Route path="/forgot-password" element={<ForgotPassword />} />        
        <Route path="/reset-password/:token" element={<ResetPassword />} />        

        {/* Lindungi halaman admin dengan ProtectedRoute */}
        <Route element={<AdminProtectedRoute redirectTo="/admin-login" />}>
          <Route path="/admin/*" element={<AdminHome />} />
         
        </Route>

        {/* Halaman yang memerlukan login */}
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/product-assembly" element={<ProductAssemblyPage />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/keranjang/costom-product" element={<KeranjangCostomProduct />} />
          <Route path="/product/detail/:id" element={<DetailProduct />} />
          <Route path="/custom-prototype" element={<CustomPrototype />} />
          <Route path="/custom-assembly" element={<ProductAssemblyPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>

      {/* Setting profile page with SidebarProfile */}
      {isProfilePage && (
        <Box sx={{ display: 'flex' }}>
          <SidebarProfile />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: '#fffff',
              minHeight: '90vh',
              mt: 8,
            }}
          >
            <Routes>
              <Route element={<ProtectedRoute redirectTo="/login" />}>
                <Route path="/user" element={<UserPage />} />
                <Route path="/user/profileSettings" element={<ProfileSettings />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/transaksi" element={<Transaksi />} />
                <Route path="/review" element={<Review />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      )}
      {/* Footer hanya muncul jika bukan di halaman login, admin, dan profile */}
      {!isLoginPage && !isAdminPage && !isProfilePage && <Footer />}
    </>
  );
}

export default App;

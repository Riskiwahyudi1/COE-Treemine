import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ResponsiveAppBar from './component/navbar';
import Footer from './component/footer';
import LoginPage from './component/login';
import RegisterPage from './component/regis';
import HomePage from './view/homepage';

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

  return (
    <>
      {!isLoginPage && <ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;

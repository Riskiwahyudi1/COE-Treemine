import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../component/sidebar';
import DataProduk from './dataProduk';
import AddProdukPage from './addProduct';
import DashboardPage from './dashboard';
import { Routes, Route } from 'react-router-dom';

export function AdminHome() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
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
          {/*<Route path="/" element={<DataProduk />} />*/}
          {/*<Route path="addProduct" element={<AddProdukPage />} />*/}
          <Route path="dashboard" element={<DashboardPage/>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default AdminHome;
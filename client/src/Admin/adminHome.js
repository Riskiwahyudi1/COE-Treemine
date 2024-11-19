import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../component/sidebar';
import DataProduk from './dataProduk';
import AddProdukPage from './addProduct';
import UpdateProdukPage from './updateProduct';
import Dashboard from './dashboard';
import BoardType from './CustomPrototype/boardType';
import AddBoardType from './CustomPrototype/addBoardType';
import KategoriPortofolio from './kategoriPortofolio';
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="dataProduct" element={<DataProduk />} />
          <Route path="dataProduct/addProduct" element={<AddProdukPage />} />
          <Route path="dataProduct/updateProduct/:id" element={<UpdateProdukPage />} />

          <Route path="/boardType" element={<BoardType />} />
          <Route path="boardType/addBoardType" element={<AddBoardType />} />

          <Route path="/kategoriPortofolio" element={<KategoriPortofolio />} />
          
          {/* <Route path="/designPanel" element={<DesignPanel />} />
          <Route path="/layers" element={<Layers />} />
          <Route path="/Material" element={<Material />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}

export default AdminHome;
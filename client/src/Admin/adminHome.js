import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../component/sidebar';
import DataProduk from './dataProduk';
import AddProdukPage from './addProduct';
import UpdateProdukPage from './updateProduct';
import Dashboard from './dashboard';
import CustomPrototype from './customPrototype';
import AddPrototype from './addPrototype';
import EditPrototype from './editItemPrototype';
import EditAssembly from './editItemAssembly';
import CustomAssembly from './customAssembly';
import AddAssembly from './addAssembly';
import KategoriPortofolio from './kategoriPortofolio';
import AddCategory from './addCategory';
import EditCategory from './editCategory';
import RequestCustom from './requestCustom';
import Transaksi from './transaksi';

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
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="dataProduct" element={<DataProduk />} />
          <Route path="dataProduct/addProduct" element={<AddProdukPage />} />
          <Route path="dataProduct/updateProduct/:id" element={<UpdateProdukPage />} />

          <Route path="/custom-prototype" element={<CustomPrototype />} />
          <Route path="custom-prototype/addPrototype/:id" element={<AddPrototype />} />
          <Route path="custom-prototype/editItemPrototype/:typeId/item/:itemId" element={<EditPrototype />} />

          <Route path="/custom-assembly" element={<CustomAssembly />} />
          <Route path="custom-assembly/addAssembly/:id" element={<AddAssembly />} />
          <Route path="custom-assembly/editItemAssembly/:typeId/item/:itemId" element={<EditAssembly />} />

          <Route path="/kategoriPortofolio" element={<KategoriPortofolio />} />
          <Route path="kategoriPortofolio/addCategory" element={<AddCategory />} />
          <Route path="kategoriPortofolio/edit-category/:id" element={<EditCategory />} />

          <Route path="/request-custom" element={<RequestCustom />} />
          <Route path="/transaksi" element={<Transaksi />} />
         


        </Routes>
      </Box>
    </Box>
  );
}

export default AdminHome;
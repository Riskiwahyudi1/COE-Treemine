import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getProducts from '../api/productListApi';
import Swal from 'sweetalert2';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

const showToast = (message, icon) => {
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00A63F',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#d4ecf8',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#e0f4fc',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '10px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
}));

const StyledButton = styled(Button)({
  backgroundColor: '#2f98cd',
  width: '150px',
  '&:hover': {
    backgroundColor: '#2f98cd',
  },
});

export default function CustomizedTables() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle delete product by ID
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/admin/product/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        if (response.status === 200) {
          showToast('Product has been deleted', 'success');
        }
      } catch (error) {
        showToast('Failed to delete product', 'error');
      }
    };
  };

  const handleAddProduk = () => {
    navigate('./addProduct');
  };

  const handlePrint = () => {
    window.print();
  };

  // Fungsi untuk menampilkan data atau teks acak jika tidak ada
  const displayValue = (value, randomText = 'Data tidak tersedia') =>
    value || randomText;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        {/* Add Produk Button with Icon */}
        <StyledButton variant="contained"
          onClick={handleAddProduk}
          sx={{
            backgroundColor: '#00A63F',
            color: '#ffffff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#7fd685',
            }
          }}
          startIcon={<AddIcon />}>
          Add Produk
        </StyledButton>

        {/* Search Produk Field */}
        <TextField
          variant="outlined"
          placeholder="Search Produk"
          sx={{
            width: '250px',
            '& .MuiOutlinedInput-root': {
              height: '36.5px',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <StyledButton variant="contained" onClick={handlePrint} startIcon={<PrintIcon />} sx={{ bgcolor: '#2f98cd', width: '90px' }}>
          Print
        </StyledButton>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                  {displayValue(product.product_name, 'Nama produk tidak ada')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {displayValue(product.id_category?.category_name, 'Kategori tidak ada')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  Rp. {displayValue(product.harga.toLocaleString('id-ID'), 'Harga tidak ada')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {displayValue(product.stock, 'Stok tidak diketahui')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.picture_url ? (
                    <img
                      src={`http://localhost:5000${product.picture_url}`}
                      alt={product.product_name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    '-'
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {displayValue(product.description, 'Deskripsi kosong')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`./updateProduct/${product._id}`)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(product._id)}
                    sx={{ marginRight: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`./detail/${product._id}`)}
                  >
                    Detail
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCostomPrototypeData } from '../api/requestCostomPrototypeApi';
import CostomPrototypeImg from '../assets/images/1.png'; 
import Toast from '../utils/Toast';

const showToast = (message, icon) => {
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

const ShoppingCartItem = ({ id, name, price, onDelete, status, handleRequest, handleCancel }) => {
  const [file, setFile] = useState(null);  // Store the file
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024; // 2MB limit
  
    if (selectedFile) {
        // Validasi ekstensi file
        const allowedExtensions = /\.(zip|rar)$/i; // regex untuk .zip dan .rar
        if (!allowedExtensions.test(selectedFile.name)) {
            setError('Only .zip or .rar files are allowed.');
            return;
        }

        // Validasi ukuran file
        if (selectedFile.size > maxFileSize) {
            setError('File size must be less than 2MB.');
            return;
        }

        // Jika valid, simpan file
        setFile(selectedFile); 
        setFileName(selectedFile.name); 
        setError(''); 
    }
};



  return (
    <Card
        elevation={3}
        sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            mb: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 3,
        }}
    >
        <CardContent sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: 2 }}>
            {/* Foto Produk */}
            <img src={CostomPrototypeImg} alt="Custom Prototype" width={64} height={64} style={{ borderRadius: 8 }} />
            {/* Nama dan Harga */}
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography fontWeight="bold" color="primary">{`Rp. ${price.toLocaleString('id-ID')}`}</Typography>
            </Box>
        </CardContent>
        <CardActions sx={{ gap: 2 }}>
          <Typography variant="text">{status}</Typography>

          {/* Kondisi: Waiting Request */}

          <Button
                variant="contained"
                size="small"
                // onClick={() => handleDetail(id)}
                sx={{
                  height: 32,
                  backgroundColor: '#0077B5',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0066A1',
                  },
                }}
              >
                Detail
              </Button>
              
          {status === 'Waiting Request' ? (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleRequest(id, file)}
                sx={{
                  backgroundColor: '#00A63F',
                  color: '#fff',
                  borderRadius: 1,
                  height: 32,
                  '&:hover': {
                    backgroundColor: '#007F2E',
                  },
                }}
              >
                Request Sekarang
              </Button>

              <Button
                variant="contained"
                component="label"
                size="small"
                sx={{ height: 32 }}
              >
                Lampirkan Desain
                <input type="file" hidden onChange={handleFileChange} />
              </Button>

              {fileName && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Selected File: {fileName}
                </Typography>
              )}

              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onDelete(id)}
                sx={{
                  height: 32,
                  '&:hover': {
                    backgroundColor: '#FF6B6B',
                  },
                }}
              >
                Hapus
              </Button>

              
            </>
          ) : null}

          {/* Kondisi: Review By Admin */}
          {status === 'Review By Admin' ? (
            <>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => handleCancel(id)}
                sx={{
                  height: 32,
                  '&:hover': {
                    backgroundColor: '#FF6B6B',
                  },
                }}
              >
                Batal
              </Button>

              
            </>
          ) : null}

          {/* Kondisi: Waiting Payment */}
          {status === 'Waiting Payment' ? (
            <>
              <Button
                variant="contained"
                size="small"
                // onClick={() => handleCheckout(id)}
                sx={{
                  height: 32,
                  backgroundColor: '#00A63F',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#007F2E',
                  },
                }}
              >
                Pesan Sekarang
              </Button>

              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleCancel(id)}
                sx={{
                  height: 32,
                  '&:hover': {
                    backgroundColor: '#FF6B6B',
                  },
                }}
              >
                Batal
              </Button>

              
            </>
          ) : null}
        </CardActions>


    </Card>
  );
};

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [requestPrototype, setRequestPrototype] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchRequestPrototype = async () => {
      try {
        const data = await getCostomPrototypeData();
        setRequestPrototype(data);
      } catch (error) {
        console.error('Failed to load products', error);
      }
    };
    fetchRequestPrototype();
  }, []);

  const handleRequest = async (id, file) => {
    if (!file) { 
        Toast.fire({
            icon: 'error',
            title: 'Please upload a file before submitting your request.',
        });
        return; 
    }
  
    const formData = new FormData(); 
    formData.append('status', 'Review By Admin'); 
    formData.append('design_file', file); 
    
    try {
        const response = await axios.put(`http://localhost:5000/costom-prototype/${id}/send-review`, formData);

        if (response.status === 200) {
            setRequestPrototype((prevList) =>
                prevList.map((request) =>
                    request._id === id ? { ...request, status: 'Review By Admin' } : request
                )
            );
            Toast.fire({
                icon: 'success',
                title: 'Item approved successfully',
            });

        }
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error.response?.data?.message || 'Error processing request.',
        });
        console.error('Error approving order:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      // const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/costom-prototype/${id}/delete`);

        setRequestPrototype((prevList) =>
          prevList.filter((product) => product._id !== id)
        );
        showToast('Product has been deleted', 'success');
      } catch (error) {
        showToast('Failed to delete product', 'error');
      }
    }
  };

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if(result.isConfirmed){

      try {
          const response = await axios.put(`http://localhost:5000/costom-prototype/${orderId}/cancel`, {
              status: 'Cancel by Buyer', 
          });
  
          if (response.status === 200) {
            setRequestPrototype((prevList) =>
              prevList.map((request) =>
                  request._id === orderId ? { ...request, status: 'Cancel by Buyer' } : request
              )
          );
  
              Toast.fire({
                  icon: 'success',
                  title: 'Item approved successfully',
              });
          }
      } catch (error) {
          console.error('Error approving order:', error.response?.data || error.message);
      }
    }
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        p: 3,
        backgroundColor: '#f3f4f6',
      }}
    >
      <Box onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
          Keranjang Custom
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        {Array.isArray(requestPrototype) && requestPrototype.length > 0 ? (
          requestPrototype.map((order) => (
            <ShoppingCartItem
              key={order._id}
              id={order._id}
              name={order.name}
              price={order.total_cost}
              status={order.status}
              onDelete={handleDelete}
              handleRequest={handleRequest}
              handleCancel={handleCancel}
            />
          ))
        ) : (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 10,
              backgroundColor: '#ffffff',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Your shopping cart is empty.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#7f91eb',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#6970c0',
                },
              }}
              onClick={() => navigate('/custom')}
            >
              Go to Custom
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ShoppingCart;

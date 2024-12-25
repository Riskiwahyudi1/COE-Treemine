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
import { getCostomPrototypeData } from '../api/requestCostomPrototypeApi';
import CostomPrototypeImg from '../assets/images/1.png';
import Toast from '../utils/Toast';
import Dialog from '../utils/Dialog';

const ShoppingCartItem = ({ id, name, price, onDelete, status, handleRequest, handleCancel, handleCheckout }) => {
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
        <Typography variant="text">{status
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}</Typography>

        {/* Kondisi: Waiting Request */}
        {status === 'Menunggu Pengajuan' ? (
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
              Ajukan Sekarang
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
        {status === 'admin-review' ? (
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

        {/* Kondisi: Disetujui */}
        {status === 'disetujui' ? (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleCheckout(id)}
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
      </CardActions>


    </Card>
  );
};

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [requestPrototype, setRequestPrototype] = useState([]);
  const [selectedId, setSelectedId] = useState('')
  const [checkoutPrototype, setCheckoutPrototype] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const singleProductPrototype = requestPrototype.filter(
    (product) => product._id === selectedId
  );

  useEffect(() => {
    if (selectedId && requestPrototype.length > 0) {
      setCheckoutPrototype(singleProductPrototype);

      if (shouldNavigate) {
        navigate("/checkout", {
          state: { singleProductPrototype },
        });

        setShouldNavigate(false);
      }
    }
  }, [selectedId, requestPrototype, shouldNavigate, navigate, singleProductPrototype]);

  const handleCheckout = async (id) => {
    const result = await Dialog.fire({
      title: 'Anda yakin?',
      text: 'Ingin checkout pesanan Ini?',
    });
    if (result.isConfirmed) {
      setSelectedId(id);
      setShouldNavigate(true);
    }
  };

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
          title: 'Mohon sertakan file desain anda !',
        });
        return;
      }

      const result = await Dialog.fire({
        title: 'Anda yakin?',
        text: 'Ingin request pesanan ini?',
      });
      if (result.isConfirmed) {

      const formData = new FormData();
      formData.append('design_file', file);

      try {
        const response = await axios.put(`http://localhost:5000/costom-prototype/${id}/send-review`, formData);

        if (response.status === 200) {
          setRequestPrototype((prevList) =>
            prevList.map((request) =>
              request._id === id ? { ...request, status: 'Admin Review' } : request
            )
          );
          Toast.fire({
            icon: 'success',
            title: 'Request berhasil dikirimkan ke admin',
          });

        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Terjadi Kesalahan',
        });
        
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Dialog.fire({
      title: 'Anda yakin?',
      text: 'Ingin Menghapus Pesanan?',
    });

    if (result.isConfirmed) {
      // const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/costom-prototype/${id}/delete`);

        setRequestPrototype((prevList) =>
          prevList.filter((product) => product._id !== id)
        );
        Toast.fire({
          icon: 'success',
          title: 'Data berhasil dihapus',
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Terjadi kesalahan',
        });
      }
    }
  };

  const handleCancel = async (orderId) => {
    const result = await Dialog.fire({
      title: 'Anda yakin?',
      text: 'Ingin membatalkan pesanan?',
    });
    if (result.isConfirmed) {

      try {
        const response = await axios.put(`http://localhost:5000/costom-prototype/${orderId}/cancel`);

        if (response.status === 200) {
          setRequestPrototype((prevList) =>
            prevList.map((request) =>
              request._id === orderId ? { ...request, status: 'Dibatalkan Pembeli' } : request
            )
          );

          Toast.fire({
            icon: 'success',
            title: 'Request Dibatalkan',
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Terjadi Kesalahan',
        });
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
              handleCheckout={handleCheckout}
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

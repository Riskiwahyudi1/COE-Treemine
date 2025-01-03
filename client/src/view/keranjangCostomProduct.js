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
import { getCostomAssemblyData } from '../api/requestCostomAssemblyApi';
import CostomPrototypeImg from '../assets/images/1.png';
import CostomAssemblyImg from '../assets/images/3.png';
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
        {name === 'Costom Prototype' ? (
          <img
            src={CostomPrototypeImg}
            alt="Custom Prototype"
            width={64}
            height={64}
            style={{
              borderRadius: 8,
              border: "1px solid #00A63F",
              borderColor: "primary.main",
            }}
          />
        ) : (
          <img
            src={CostomAssemblyImg}
            alt="Costom Assembly"
            width={64}
            height={64}
            style={{
              borderRadius: 8,
              border: "1px solid #00A63F",
              borderColor: "primary.main",
            }}
          />
        )}

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
        {status === 'menunggu-pengajuan' ? (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleRequest(id, file, name)}
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
              onClick={() => onDelete(id, name)}
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
              onClick={() => handleCancel(id, name)}
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
  const [requestAssembly, setRequestAssembly] = useState([]);
  const [requestCustom, setRequestCustom] = useState([]);
  const [selectedId, setSelectedId] = useState('')
  const [checkoutPrototype, setCheckoutPrototype] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const singleProductCostom = requestCustom.filter(
    (product) => product._id === selectedId
  );


  useEffect(() => {
    if (selectedId && requestPrototype.length > 0) {
      setCheckoutPrototype(singleProductCostom);

      if (shouldNavigate) {
        navigate("/checkout", {
          state: { singleProductCostom },
        });

        setShouldNavigate(false);
      }
    }
  }, [selectedId, requestPrototype, shouldNavigate, navigate, singleProductCostom]);

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

  // Data request custom
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prototypeData, assemblyData] = await Promise.allSettled([
          getCostomPrototypeData(),
          getCostomAssemblyData()
        ]);

        // Handle resolved or rejected promises
        const resolvedPrototypeData = prototypeData.status === 'fulfilled' ? prototypeData.value : [];
        const resolvedAssemblyData = assemblyData.status === 'fulfilled' ? assemblyData.value : [];

        // Combine and sort data
        let combinedData = [...resolvedPrototypeData, ...resolvedAssemblyData];
        combinedData = combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Update state
        setRequestPrototype(resolvedPrototypeData);
        setRequestAssembly(resolvedAssemblyData);
        setRequestCustom(combinedData);
      } catch (error) {
        console.error('Failed to load products', error);
      }
    };

    fetchData();
  }, []);



  const handleRequest = async (id, file, type) => {
    if (!file) {
      Toast.fire({
        icon: 'error',
        title: 'Mohon sertakan file desain anda!',
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
        let response;
        if (type === 'Costom Prototype') {
          response = await axios.put(
            `http://localhost:5000/costom-prototype/${id}/send-review`,
            formData
          );
          if (response.status === 200) {
            setRequestCustom((prevList) =>
              prevList.map((request) =>
                request._id === id ? { ...request, status: 'admin-review' } : request
              )
            );
          }
        } else if (type === 'Costom Assembly') {
          response = await axios.put(
            `http://localhost:5000/costom-assembly/${id}/send-review`,
            formData
          );
          if (response.status === 200) {
            setRequestCustom((prevList) =>
              prevList.map((request) =>
                request._id === id ? { ...request, status: 'admin-review' } : request
              )
            );
          }
        }

        if (response && response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: 'Request berhasil dikirimkan ke admin',
          });
        }
      } catch (error) {
        console.error('Error updating request:', error);
        Toast.fire({
          icon: 'error',
          title: 'Terjadi Kesalahan',
        });
      }
    }
  };


  const handleDelete = async (id, type) => {
    const result = await Dialog.fire({
      title: 'Anda yakin?',
      text: `Ingin menghapus pesanan ${type === 'prototype' ? 'Custom Prototype' : 'Custom Assembly'} ini?`,
    });

    if (result.isConfirmed) {
      try {
        const apiUrl = type === 'Costom Prototype'
          ? `http://localhost:5000/costom-prototype/${id}/delete`
          : `http://localhost:5000/costom-assembly/${id}/delete`;

        await axios.delete(apiUrl);

        if (type === 'Costom Prototype') {
          setRequestCustom((prevList) =>
            prevList.filter((product) => product._id !== id)
          );
        } else if (type === 'Costom Assembly') {
          setRequestCustom((prevList) =>
            prevList.filter((product) => product._id !== id)
          );
        }

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


  const handleCancel = async (id, type) => {
    const result = await Dialog.fire({
      title: 'Anda yakin?',
      text: 'Ingin membatalkan pesanan?',
    });
    if (result.isConfirmed) {
      try {

        const endpoint =
          type === 'Costom Prototype'
            ? `http://localhost:5000/costom-prototype/${id}/cancel`
            : `http://localhost:5000/costom-assembly/${id}/cancel`;

        const response = await axios.put(endpoint);

        if (response.status === 200) {

          if (type === 'Costom Prototype') {
            setRequestCustom((prevList) =>
              prevList.map((request) =>
                request._id === id ? { ...request, status: 'dibatalkan-pembeli' } : request
              )
            );
          } else if (type === 'Costom Assembly') {
            setRequestCustom((prevList) =>
              prevList.map((request) =>
                request._id === id ? { ...request, status: 'dibatalkan-pembeli' } : request
              )
            );
          }

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
        {Array.isArray(requestCustom) && requestCustom.length > 0 ? (
          requestCustom.map((order) => (
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

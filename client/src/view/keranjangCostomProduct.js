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
   Modal
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
import { formatDate } from '../utils/isoDate';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';



const ShoppingCartItem = ({ id, name, price, onDelete, status, handleRequest, handleCancel, handleCheckout , handleOpenModal}) => {
  const [file, setFile] = useState(null); 
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024; 

    if (selectedFile) {
      // Validasi ekstensi file
      const allowedExtensions = /\.(zip|rar)$/i; 
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
          onClick={() => handleOpenModal(id)}
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


const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  width: 500,
  backgroundColor: 'white',
  borderRadius: 8,
  boxShadow: 24,
  padding: theme.spacing(4),
  outline: 'none',
}));


const ShoppingCart = () => {
  const navigate = useNavigate();
  const { userToken } = useAuth(); 
  const [requestPrototype, setRequestPrototype] = useState([]);
  const [requestAssembly, setRequestAssembly] = useState([]);
  const [requestCustom, setRequestCustom] = useState([]);
  const [selectedId, setSelectedId] = useState('')
  const [openModalId, setIdOpenModal] = useState('')
  const [checkoutPrototype, setCheckoutPrototype] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const singleProductCostom = requestCustom.filter(
    (product) => product._id === selectedId
  );

  useEffect(() => {
    if (selectedId) {
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
          getCostomPrototypeData(userToken),
          getCostomAssemblyData(userToken)
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
            `${apiConfig.baseURL}costom-prototype/${id}/send-review`,
            formData,{
              headers: {
                  'Authorization': `Bearer ${userToken}`,
                  
              },
              timeout: 10000,
          }
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
            `${apiConfig.baseURL}costom-assembly/${id}/send-review`,
            formData,{
              headers: {
                  'Authorization': `Bearer ${userToken}`,
                  
              },
              timeout: 10000,
          }
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
          ? `${apiConfig.baseURL}costom-prototype/${id}/delete`
          : `${apiConfig.baseURL}costom-assembly/${id}/delete`;

        await axios.delete(apiUrl,
          {
            headers: {
                'Authorization': `Bearer ${userToken}`,
               
            },
            timeout: 10000,
        }
        );

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
            ? `${apiConfig.baseURL}costom-prototype/${id}/cancel`
            : `${apiConfig.baseURL}costom-assembly/${id}/cancel`;

        const response = await axios.put(endpoint,{
          headers: {
              'Authorization': `Bearer ${userToken}`,
             
          },
          timeout: 10000,
      });

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

  const handleOpenModal = (order) => {
    setIdOpenModal(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRequestPrototype(null);
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
              handleOpenModal={handleOpenModal}
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
      <StyledModal open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          {/* Detail untuk Prototype */}
          {requestPrototype && requestPrototype.length > 0 ? (
            requestPrototype
              .filter(data => data._id === openModalId)
              .map((data, idx) => (
                <div key={idx}>
                  {/* Header */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Detail Pesanan - Prototype
                  </Typography>

                  {/* Informasi Pesanan */}
                 
                  <Typography variant="body1">
                    <strong>Type Custom:</strong> {data.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Tanggal:</strong> {formatDate(data.createdAt)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Harga:</strong> Rp.{Number(data.total_cost).toLocaleString('id-ID')}
                  </Typography>

                  <Typography variant="body1">
                    <strong>Status:</strong> {data.status
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </Typography>

                  {/* Spesifikasi */}
                  <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold', marginBottom: 1 }}>
                    Spesifikasi :
                  </Typography>
                  <Box>
                    {[
                    { label: 'Board Type', value: data.board_type },
                    { label: 'X Out', value: data.x_out },
                    { label: 'Route Process', value: data.route_process },
                    { label: 'Design in Panel', value: data.design_in_panel },
                    { label: 'Size', value: `${data.length} X ${data.width}` },
                    { label: 'Quantity', value: data.quantity },
                    { label: 'Layer', value: data.layer },
                    { label: 'Copper Layer', value: data.copper_layer },
                    { label: 'Solder Mask Position', value: data.solder_mask_position },
                    { label: 'Material', value: data.material },
                    { label: 'Thickness', value: data.thickness },
                    { label: 'Min Track', value: data.min_track },
                    { label: 'Min Hole', value: data.min_hole },
                    { label: 'Solder Mask', value: data.solder_mask },
                    { label: 'Silkscreen', value: data.silkscreen },
                    { label: 'UV Printing', value: data.uv_printing },
                    { label: 'Surface Finish', value: data.surface_finish },
                    { label: 'Finish Copper', value: data.finish_copper },
                    ]
                      .map((item, idx) => (
                        <Typography key={idx} variant="body2">
                          <strong>{item.label}: </strong> {item.value}
                        </Typography>
                      ))}
                  </Box>
                </div>
              ))
          ) : (
            // Loading State
            <Typography variant="body1"></Typography>
          )}
          {/* Detail untuk Assembly */}
          {requestAssembly && requestAssembly.length > 0 ? (
            requestAssembly
              .filter(data => data._id === openModalId)
              .map((data, idx) => (
                <div key={idx}>
                  {/* Header */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Detail Pesanan - Assembly
                  </Typography>

                  {/* Informasi Pesanan */}
                
                  <Typography variant="body1">
                    <strong>Type Custom:</strong> {data.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Tanggal:</strong> {formatDate(data.createdAt)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Harga:</strong> Rp.{Number(data.total_cost).toLocaleString('id-ID')}
                  </Typography>

                  <Typography variant="body1">
                    <strong>Status:</strong> {data.status
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </Typography>

                  {/* Spesifikasi untuk Assembly */}
                  <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold', marginBottom: 1 }}>
                    Spesifikasi :
                  </Typography>
                  <Box>
                    {[{ label: 'Flexible Option', value: data.flexible_option },
                    { label: 'Board Type', value: data.board_type },
                    { label: 'Assembly Side', value: data.assembly_side },
                    { label: 'Quantity', value: data.quantity },
                    { label: 'Pay Attention', value: data.pay_attention },
                    { label: 'Notes', value: data.notes },
                    { label: 'Unique Part Number', value: data.number_unik_part },
                    { label: 'SMD Part Number', value: data.number_SMD_part },
                    { label: 'BGA/QFP Part Number', value: data.number_BGA_QFP },
                    { label: 'Through Hole', value: data.throught_hole },
                    { label: 'Board to Delivery', value: data.board_to_delivery },
                    { label: 'Function Test', value: data.function_test },
                    { label: 'Cable/Wire Harness Assembly', value: data.cable_wire_harness_assembly },
                    { label: 'Detail Information', value: data.detail_information },
                   ]
                      .map((item, idx) => (
                        <Typography key={idx} variant="body2">
                          <strong>{item.label}: </strong> {item.value ? item.value : 'N/A'}
                        </Typography>
                      ))}
                  </Box>
                </div>
              ))
          ) : (
            // Loading State
            <Typography variant="body1"></Typography>
          )}

          {/* Tombol Penutup */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#54cbbb',
                '&:hover': { backgroundColor: '#46b2a6' },
              }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </ModalContent>
      </StyledModal>
    </Box>
  );
};

export default ShoppingCart;

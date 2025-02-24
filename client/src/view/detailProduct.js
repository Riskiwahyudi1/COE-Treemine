import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import apiConfig from '../config/apiConfig';

const ProductPage = () => {
    const navigate = useNavigate();
    const { userToken } = useAuth(); 
    const { id } = useParams();
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleBack = () => {
        navigate(-1);
    };
    // const handleCheckout = () => {
    //     navigate("/checkout", {
    //         state: {
    //             product,

    //         }
    //     });
    // };

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}product/${id}`);
                setProduct(response.data);
                setImagePreview(response.data.image_url);
            } catch (error) {
                setError('Failed to load product data');
            }
        };
        fetchProductById();
    }, [id]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const handleSubmitCart = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true)
            

            if (!userToken) {
                setError('Unauthorized access. Please log in first.');
                Toast.fire({
                    icon: 'error',
                    title: 'Please log in first',
                });
                return;
            }

            const data = { id_product: id };

            const response = await axios.post(
                `${apiConfig.baseURL}cart/add-product`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                }
            );

            if (response.status === 201) {
                navigate(`/product/detail/${id}`, { state: { showToast: true } });
                Toast.fire({
                    icon: 'success',
                    title: 'Product added to cart!',
                });
                setLoading(false)
            } else {
                setLoading(false)
                setError('Failed to add product. Please try again!');
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add product. Please try again!',
                });
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) {
                    setError('Unauthorized access. Please log in again.');
                    Toast.fire({
                        icon: 'error',
                        title: data.message,
                    });
                } else if (status === 409) {
                    setError('Product is already in the cart.');
                    Toast.fire({
                        icon: 'warning',
                        title: data.message,
                    });
                } else if (status >= 500) {
                    setError('Server error. Please try again later.');
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error. Please try again later.',
                    });
                }
            } else if (error.request) {
                setLoading(false)
                setError('Network error. Please check your internet connection.');
                Toast.fire({
                    icon: 'error',
                    title: 'Network error. Please check your internet connection.',
                });
            } else {
                setLoading(false)
                setError('Failed to add product. Please try again.');
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add product. Please try again.',
                });
            }
        }
    };

    return (
        <Box sx={{ minHeight: "50vh", p: 3 }}>
            <Box
                onClick={handleBack}
                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
            >
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1 }}>
                    Back
                </Typography>
            </Box>

            {product ? (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                    <Box
                        component="img"
                        src={`${apiConfig.baseURL}${product.picture_url}`}
                        alt="Product"
                        sx={{ width: 300, height: 200, objectFit: 'cover' }}
                    />

                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {product.product_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography
                                color={product.stock > 10 ? "#00A63F" : product.stock > 0 ? "warning" : "#FF0000"}
                            >
                                {product.stock > 0 ? `Stok: ${product.stock}` : "Stok: Habis"}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Price: Rp. {product.harga.toLocaleString()}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button variant="contained" disabled={product.stock === 0} onClick={handleSubmitCart} sx={{ backgroundColor: '#00A63F', color: '#fff' }} >
                                {loading ? <CircularProgress sx={6} /> : <ShoppingCartIcon />}
                            </Button>
                            {/* <Button variant="contained" onClick={handleCheckout} sx={{ backgroundColor: '#00A63F', color: '#fff' }}>
                                Beli Sekarang
                            </Button> */}
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Typography>Loading product data...</Typography>
            )}

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Description
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mt: 1, whiteSpace: 'pre-line' }} 
                >
                    {product?.description}
                </Typography>
            </Box>

        </Box>
    );
};

export default ProductPage;

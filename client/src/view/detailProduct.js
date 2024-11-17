import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  

const ProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [product, setProduct] = useState(null);

    const handleBack = () => {
        navigate('/product'); 
    };

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admin/product/${id}`);
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
            const token = localStorage.getItem('token'); 
    
            if (!token) {
                setError('Unauthorized access. Please log in first.');
                Toast.fire({
                    icon: 'error',
                    title: 'Please log in first',
                }); 
                return;
            }
    
            const data = { id_product: id };
    
            const response = await axios.post(
                'http://localhost:5000/cart/add-product', 
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  
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
            } else {
                setError('Failed to add product. Please try again!');
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add product. Please try again!',
                }); 
            }
        } catch (error) {
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
                setError('Network error. Please check your internet connection.');
                Toast.fire({
                    icon: 'error',
                    title: 'Network error. Please check your internet connection.',
                });
            } else {
                setError('Failed to add product. Please try again.');
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add product. Please try again.',
                });
            }
        }
    };

    return (
        <Box sx={{ p: 3 }}>
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
                        src={`http://localhost:5000${product.picture_url}`}
                        alt="Product"
                        sx={{ width: 300, height: 200, objectFit: 'cover' }}
                    />

                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {product.product_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography>Quantity : </Typography>
                            <Typography sx={{ ml: 1 }}>{product.stock} available</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Price: Rp. {product.harga.toLocaleString()}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button variant="outlined" onClick={handleSubmitCart}>
                                Add to cart
                            </Button>
                            <Button variant="contained" sx={{ backgroundColor: '#d565be', color: '#fff' }}>
                                Buy now
                            </Button>
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
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {product?.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductPage;

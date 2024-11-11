import React, {useEffect, useState} from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import product1 from '../assets/images/1.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
        }
        fetchProductById();
    }, [id]);
    return (
        <Box sx={{ p: 3 }}>
            {/* Back Button */}
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
    
            {/* Product Image and Details */}
            {product ? (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                    {/* Product Image */}
                    <Box
                        component="img"
                        src={`http://localhost:5000${product.picture_url}`}
                        alt="Product"
                        sx={{ width: 300, height: 200, objectFit: 'cover' }}
                    />
    
                    {/* Product Info */}
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {product.product_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography>Quantity</Typography>
                            <TextField
                                type="number"
                                defaultValue={1}
                                size="small"
                                sx={{ width: 60, ml: 1 }}
                                inputProps={{ min: 1 }}
                            />
                            <Typography sx={{ ml: 1 }}>{product.stock} available</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Price: Rp. {product.harga.toLocaleString()}
                        </Typography>
    
                        {/* Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button variant="outlined">Add to cart</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#d565be', color: '#fff' }}>
                                Buy now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Typography>Loading product data...</Typography>
            )}
    
            {/* Description */}
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

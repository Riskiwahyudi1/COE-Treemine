import React from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import product1 from '../assets/images/1.png';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk handling navigasi
    const handleBack = () => {
        navigate('/product'); // Navigasi ke halaman custom prototype
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Back Button */}
            <Box 
            onClick={handleBack}
            sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1 }}>
                    Back
                </Typography>
            </Box>

            {/* Product Image and Details */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                {/* Product Image */}
                <Box
                    component="img"
                    src={product1} // Replace with your product image URL
                    alt="Product"
                    sx={{ width: 300, height: 200, objectFit: 'cover' }}
                />

                {/* Product Info */}
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        BOARD
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
                        <Typography sx={{ ml: 1 }}>5 available</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Price : Rp. 50.000
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

            {/* Description */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Description
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductPage;

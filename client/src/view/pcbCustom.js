import React from 'react';
import { Container, Box, Typography, Button, Grid, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import product1 from '../assets/images/5.png';
import product2 from '../assets/images/5.png';

const CustomPage = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk handling navigasi
    const handlePrototypeClick = () => {
        navigate('/custom-prototype'); // Navigasi ke halaman custom prototype
    };

    const handleAssemblyClick = () => {
        navigate('/custom-assembly'); // Navigasi ke halaman custom assembly
    };
    return (
        <Card
            style={{
                background: `linear-gradient(to bottom, white, white)`,
                height: '90vh',
                margin: 0,
                padding: 0,
                marginTop:'20px',
            }}
        >
            <Container>
                {/* Header Section */}
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: '30px',
                        marginTop:'30px',
                    }}
                >
                    Product Custom
                </Typography>

                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Product 1 */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: 300,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                bgcolor: '#ffffff',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            {/* Image Section */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 4,
                                    marginRight: '20px',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={product1}
                                    alt="Natural beauty cream product 1"
                                    sx={{
                                        borderRadius: '50%',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>

                            {/* Content Section */}
                            <Box sx={{ flex: 8 }}>
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#000000' }}>
                                    Custom Prototype
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666666', marginTop: '10px', marginBottom: '20px' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handlePrototypeClick}
                                    sx={{
                                        borderColor: '#00A63F',
                                        color: '#00A63F',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: '#00A63F',
                                            color: '#ffffff',
                                        },
                                    }}
                                >
                                    CUSTOM NOW
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Product 2 */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: 300,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                bgcolor: '#ffffff',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            {/* Image Section */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 4,
                                    marginRight: '20px',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={product2}
                                    alt="Natural beauty cream product 2"
                                    sx={{
                                        borderRadius: '50%',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>

                            {/* Content Section */}
                            <Box sx={{ flex: 8 }}>
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#000000' }}>
                                    Custom Assembly
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666666', marginTop: '10px', marginBottom: '20px' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleAssemblyClick}
                                    sx={{
                                        borderColor: '#00A63F',
                                        color: '#00A63F',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: '#00A63F',
                                            color: '#ffffff',
                                        },
                                    }}
                                >
                                    CUSTOM NOW
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Card>
    );
};

export default CustomPage;
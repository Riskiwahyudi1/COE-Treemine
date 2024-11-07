import React from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import product1 from '../assets/images/5.png';
import product2 from '../assets/images/5.png';

const NaturalBeautyCream = () => {
    return (
        <div
            style={{
                background: `linear-gradient(to bottom, #2f98cd, white)`,
                height: '90vh',
                margin: 0,
                padding: 0,
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
                        marginBottom: '50px',
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
                                    href="#"
                                    sx={{
                                        borderColor: '#54cbbb',
                                        color: '#54cbbb',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: '#54cbbb',
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
                                    href="#"
                                    sx={{
                                        borderColor: '#54cbbb',
                                        color: '#54cbbb',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: '#54cbbb',
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
        </div>
    );
};

export default NaturalBeautyCream;
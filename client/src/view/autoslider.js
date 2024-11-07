import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import vid from '../assets/images/Firmware.gif';

export default function TicketLandingPage() {
    const features = [
        {
            icon: "01",
            title: "Online Quote",
            description: "Place an order on CoE Timeline"
        },
        {
            icon: "02",
            title: "Upload PCB file",
            description: "Submit your PCB design files"
        },
        {
            icon: "03",
            title: "Order Review",
            description: "We check your specifications"
        },
        {
            icon: "04",
            title: "Payment",
            description: "Secure payment processing"
        },
        {
            icon: "05",
            title: "Fabrication",
            description: "PCB manufacturing begins"
        },
        {
            icon: "06",
            title: "Delivery",
            description: "Ships to your location"
        },
        {
            icon: "07",
            title: "Confirm Received",
            description: "Order completion verified"
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: `linear-gradient(to bottom, #2f98cd, white)`
        }}>
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                {/* Hero Section */}
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 'bold',
                                mb: 2
                            }}>
                                The best PCB buying experience
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                yrgveyindrui uiywegdryrgnuedir iuydrniyersnye iegrdn weygdr wieyrd we diewygr d7wetrf xwyegfdoweufg qyegfy ceqvfegwix fqgeyiv cfyiex fyiev  diuefiodufgoy yefg yiywzgfueg
                            </Typography>
                            <Box
                                component="button"
                                sx={{
                                    backgroundColor: '#54cbbb',
                                    color: 'white',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 50,
                                    border: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.9
                                    }
                                }}
                            >
                                Learn More
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{
                                position: 'absolute',
                                width: 300,
                                height: 300,
                                borderRadius: '50%',
                                backgroundColor: '#7fd685',
                                filter: 'blur(60px)',
                                opacity: 0.3,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 0
                            }} />
                            <Box
                                component="img"
                                src={vid}
                                alt="Mobile app preview"
                                sx={{
                                    width: '100%',
                                    maxWidth: 400,
                                    mx: 'auto',
                                    display: 'block',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Features Section */}
                <Box sx={{ mt: 4, pb: 8, overflowX: 'auto' }}>
                    <Typography variant="h4" sx={{ color: 'black', mb: 4, fontWeight: 'bold' }}>
                        How to Use?
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        minWidth: 'min-content',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '32px',
                            left: '60px',
                            right: '60px',
                            height: '2px',
                            backgroundColor: '#e0e0e0',
                            zIndex: 0
                        }
                    }}>
                        {features.map((feature, index) => (
                            <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 2, // Mengurangi padding
                                minWidth: {
                                    xs: '160px', // Mengurangi lebar minimal agar fitur tidak melebar
                                    sm: '140px',
                                    md: '120px',
                                    lg: '100px'
                                },
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1, // Mengurangi jarak antar elemen dalam fitur
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: 2,
                                transition: 'all 0.3s',
                                position: 'relative',
                                zIndex: 1,
                                '&:hover': {
                                    boxShadow: 3,
                                    transform: 'translateY(-4px)'
                                }
                            }}
                        >
                            <Box sx={{
                                width: 28, // Mengurangi ukuran ikon
                                height: 28,
                                bgcolor: '#2f98cd',
                                borderRadius: 1,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem', // Mengurangi ukuran font ikon
                                fontWeight: 'bold',
                                mb: 1
                            }}>
                                {feature.icon}
                            </Box>
                            <Typography sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: '0.875rem' // Mengurangi ukuran font judul
                            }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                fontSize: '0.75rem' // Mengurangi ukuran font deskripsi
                            }}>
                                {feature.description}
                            </Typography>
                            {index < features.length - 1 && (
                                <Box sx={{
                                    position: 'absolute',
                                    right: '-10px', // Mengurangi jarak panah
                                    top: '32px',
                                    color: '#2f98cd',
                                    fontWeight: 'bold',
                                    zIndex: 2
                                }}>
                                    →
                                </Box>
                            )}
                        </Paper>
                        
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
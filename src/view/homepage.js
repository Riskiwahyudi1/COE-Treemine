import React, { useEffect } from 'react';
import { Typography, Container, Grid, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShopCard from './shopCard';
// Gambar untuk Landing Page
import Videocontoh from '../assets/images/Ecommerce web page.gif';
import product1 from '../assets/images/1.png';
import product2 from '../assets/images/3.png';
import product3 from '../assets/images/2.png';

const theme = createTheme({
    palette: {
        primary: {
            main: '#84c9ef',
        },
        secondary: {
            main: '#8362ad',
        },
        background: {
            default: '#b4d2ed',
        },
    },
});

const LandingPage = () => {
    useEffect(() => {
        const svgElement = document.querySelector('svg');
        if (svgElement) {
            setTimeout(() => {
                svgElement.classList.add('animated');
            }, 1000);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh'  }}>
                <Container maxWidth="lg" sx={{ mt: 8 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" component="h1" gutterBottom sx={{fontSize:'47px', fontWeight: 'bold'}}>
                            Selamat datang di <br/> COE Treemine
                            </Typography>
                            <Typography variant="h6" paragraph sx={{fontSize:'17px' }}>
                            penyedia Printed Circuit Boards (PCB) berkualitas tinggi di Indonesia. Kami berkomitmen menghadirkan produk terbaik untuk mendukung berbagai kebutuhan elektronik Anda. Dengan layanan yang ramah dan profesional, kami siap membantu kesuksesan proyek Anda dengan solusi yang andal dan harga kompetitif.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ bgcolor: '#d565be', color: 'white', mt: 2 }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                sx={{
                                    width: '100%',
                                    maxWidth: 650,
                                    height: 'auto',
                                }}
                                src={Videocontoh}
                                alt="Mockup aplikasi tiket"
                            />
                        </Grid>
                    </Grid>
                </Container>

                {/* Product Features Section */}
                <Container sx={{ marginTop: 5, marginBottom: 5 }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'black' }}>
                        Why Choose Our PCBs?
                    </Typography>
                    <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 5, marginBottom: 5 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    backgroundImage: `url(${product1})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '220px',
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                }}
                            />
                            <Typography variant="h6" align="center" gutterBottom>
                                High Quality
                            </Typography>
                            <Typography align="center">Our PCBs are built with the highest quality materials and precision.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    backgroundImage: `url(${product2})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '220px',
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                }}
                            />
                            <Typography variant="h6" align="center" gutterBottom>
                                Custom Designs
                            </Typography>
                            <Typography align="center">We offer flexible customization options to meet your specific needs.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    backgroundImage: `url(${product3})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '220px',
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                }}
                            />
                            <Typography variant="h6" align="center" gutterBottom>
                                Affordable Pricing
                            </Typography>
                            <Typography align="center">Get the best quality PCBs at competitive prices.</Typography>
                        </Grid>
                    </Grid>
                </Container>

                <ShopCard />
            </Box>
        </ThemeProvider>
    );
};

export default LandingPage;

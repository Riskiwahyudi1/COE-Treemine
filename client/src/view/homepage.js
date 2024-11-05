import React, { useEffect } from 'react';
import { Typography, Container, Grid, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShopCard from './shopCard';
import PCBcustom from './pcbCustom';  
import Autoslider from './autoslider';
import Service from './service';
import ProductAssembly from './productAssembly'
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
            default: '#ffffff', // Changed to white
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
            <Autoslider/>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>

                {/* Product Features Section with Blue Background */}
                <Box sx={{ bgcolor: '#ffffff' }}>
                    <Container sx={{ pt: 5, pb: 5 }}>
                        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'black' }}>
                            Why Choose Our PCBs?
                        </Typography>
                        <Grid container spacing={4} justifyContent="center" sx={{ mt: 5, mb: 5 }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        backgroundImage: `url(${product1})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '220px',
                                        borderRadius: '8px',
                                        mb: '16px',
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
                                        mb: '16px',
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
                                        mb: '16px',
                                    }}
                                />
                                <Typography variant="h6" align="center" gutterBottom>
                                    Affordable Pricing
                                </Typography>
                                <Typography align="center">Get the best quality PCBs at competitive prices.</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Call PCBcustom component here */}
                <PCBcustom />
                <ProductAssembly/>

                {/* ShopCard component */}
                <ShopCard />
                <Service/>


            </Box>
        </ThemeProvider>
    );
};

export default LandingPage;

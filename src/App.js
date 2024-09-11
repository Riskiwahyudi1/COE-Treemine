import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid2, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './component/footer';
import ShopCard from './view/shopCard';
import Navbar from './component/navbar';
// Gambar untuk Landing Page
import heroImage from './assets/images/pcb4.jpg';
import product1 from './assets/images/pcb1.jpeg';
import product2 from './assets/images/pcb2.jpg';
import product3 from './assets/images/pcb3.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },

});

function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      {/* Navbar */}
     <Navbar/>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '650px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          The Best Quality PCB Products
        </Typography>
      </Box>

      {/* Product Features Section */}
      <Container sx={{ marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Why Choose Our PCBs?
        </Typography>
        <Grid2 container spacing={4} justifyContent="center">
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundImage: `url(${product1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            ></Box>
            <Typography variant="h6" align="center" gutterBottom>
              High Quality
            </Typography>
            <Typography align="center">Our PCBs are built with the highest quality materials and precision.</Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundImage: `url(${product2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            ></Box>
            <Typography variant="h6" align="center" gutterBottom>
              Custom Designs
            </Typography>
            <Typography align="center">We offer flexible customization options to meet your specific needs.</Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundImage: `url(${product3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            ></Box>
            <Typography variant="h6" align="center" gutterBottom>
              Affordable Pricing
            </Typography>
            <Typography align="center">Get the best quality PCBs at competitive prices.</Typography>
          </Grid2>
        </Grid2>
      </Container>

      <ShopCard />

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" paragraph>
          Contact us today to order the best PCBs for your projects.
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Contact Us
        </Button>
      </Box>



      {/* Footer */}
      <Footer />
    </ThemeProvider>
  );
}

export default LandingPage;

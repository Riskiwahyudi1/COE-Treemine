import React from 'react';
import { Card, Container, CardContent, CardActions, Typography, Button, Box, Grid, Rating } from '@mui/material';
import product1 from '../assets/images/1.png';
import product2 from '../assets/images/3.png';
import product3 from '../assets/images/2.png';
import product4 from '../assets/images/5.png';
import { useNavigate } from 'react-router-dom';


const products = [
    { title: "Board", price: "$100.00", rating: 4, img: product1 },
    { title: "Kabel", price: "$40.00", rating: 4.5, img: product4 },
    { title: "Lem", price: "$70.84", rating: 3, img: product3 },
    { title: "Timah", price: "$1000.84", rating: 5, img: product2 },
];

const ProductCard = ({ title, price, rating, img }) => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk handling navigasi
    const handleDetailProduct = () => {
        navigate('/detail-product'); // Navigasi ke halaman custom prototype
    };

    return (
        <Card
            sx={{
                width: 280, // Ubah nilai ini untuk mengatur lebar card
                height: 400, // Ubah nilai ini untuk mengatur tinggi card
                m: 0,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img src={img} alt={title} style={{ width: '150px', height: '150px' }} />
                </Box>
                <Typography variant="h6" align="center" gutterBottom>{title}</Typography>
                <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <Typography variant="h6" align="center" sx={{ mt: 1 }}>{price}</Typography>
                <Rating name="read-only" value={rating} precision={0.5} readOnly />
            </CardContent>
            <CardActions>
                <Button variant="contained"
                onClick={handleDetailProduct}
                    sx={{
                        backgroundColor: '#54cbbb',
                        '&:hover': {
                            backgroundColor: '#47b4a7', // slightly darker shade for hover effect
                        },
                    }}
                    fullWidth>
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    );
};

const App = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                background: 'linear-gradient(to bottom, white, #2f98cd, white)',
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
                        marginTop: '-180px',
                    }}
                >
                    Our Product
                </Typography>
                <Grid container justifyContent="center" spacing={4}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <ProductCard {...product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default App;
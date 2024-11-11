import React, { useEffect, useState } from 'react';
import { Card, Container, CardContent, CardActions, Typography, Button, Box, Grid, Rating } from '@mui/material';
import getProducts from '../api/productListApi';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product_id ,product_name, harga, description, picture_url }) => {
    const navigate = useNavigate();

    // const handleDetailProduct = () => {
    //     navigate('/detail-product/:id');
    // };

    return (
        <Card
            sx={{
                width: 280,
                height: 400,
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
                    <img src={`http://localhost:5000${picture_url}`} alt={product_name} style={{ width: '150px', height: '150px' }} />
                </Box>
                <Typography variant="h6" align="center" gutterBottom>{product_name}</Typography>
                <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                    {description}
                </Typography>
                <Typography variant="h6" align="center" sx={{ mt: 1 }}>Rp.{harga.toLocaleString('id-ID')}</Typography>
                <Rating name="read-only" value={5} precision={0.5} readOnly />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    onClick={() => navigate(`./product/detail/${product_id}`)}
                    sx={{
                        backgroundColor: '#54cbbb',
                        '&:hover': {
                            backgroundColor: '#47b4a7',
                        },
                    }}
                    fullWidth
                >
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    );
};

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };
        fetchProducts();
    }, []);

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
                <Grid container spacing={4} justifyContent="center">
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={3}>
                            <ProductCard
                                product_id = {product._id}
                                product_name={product.product_name}
                                harga={product.harga}
                                description={product.description}
                                picture_url={product.picture_url}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default App;

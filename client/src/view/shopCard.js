import React, { useEffect, useState } from 'react';
import { Card, Container, CardContent, CardActions, Typography, Button, Box, Grid, Rating } from '@mui/material';
import getProducts from '../api/productListApi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductCard = ({ product_id, product_name, harga, description, picture_url, onAddToCart }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: '100%',
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                    <img
                        src={`http://localhost:5000${picture_url}`}
                        alt={product_name}
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                </Box>
                <Typography variant="h6" align="center" gutterBottom>
                    {product_name}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {description}
                </Typography>
                <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                    Rp.{harga.toLocaleString('id-ID')}
                </Typography>
                <Rating name="read-only" value={4.5} precision={0.5} readOnly sx={{ display: 'flex', justifyContent: 'center' }} />
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/product/detail/${product_id}`)}
                    sx={{
                        backgroundColor: '#54cbbb',
                        '&:hover': {
                            backgroundColor: '#47b4a7',
                        },
                        flex: 1,
                        marginRight: '10px',
                    }}
                >
                    Buy Now
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => onAddToCart(product_id)}
                    sx={{
                        borderColor: '#54cbbb',
                        color: '#54cbbb',
                        '&:hover': {
                            borderColor: '#47b4a7',
                            color: '#47b4a7',
                        },
                        flex: 1,
                    }}
                >
                    <ShoppingCartIcon />
                </Button>
            </CardActions>

        </Card>
    );
};

const App = () => {
    const [products, setProducts] = useState([]);

    const handleAddToCart = (productId) => {
        // Simulasi penambahan ke keranjang belanja
        Swal.fire({
            icon: 'success',
            title: 'Product added to cart!',
            showConfirmButton: false,
            timer: 1500,
        });
        console.log(`Product with ID: ${productId} added to cart`);
    };

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
                background: 'linear-gradient(to bottom, #2f98cd, white)',
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
                        marginTop: '-130px',
                    }}
                >
                    Our Products
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard
                                product_id={product._id}
                                product_name={product.product_name}
                                harga={product.harga}
                                description={product.description}
                                picture_url={product.picture_url}
                                onAddToCart={handleAddToCart}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default App;

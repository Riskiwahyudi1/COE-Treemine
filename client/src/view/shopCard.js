import React, { useEffect, useState } from 'react';
import { Card, Container, CardContent, CardActions, Typography, Button, Box, Grid, Rating } from '@mui/material';
import getProducts from '../api/productListApi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

const ProductCard = ({ product_id, product_name, harga, description, stock, picture_url, onAddToCart }) => {
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
                <Typography
                    color={stock > 10 ? "#00A63F" : stock > 0 ? "warning" : "#FF0000"}
                >
                    {stock > 0 ? `Stok: ${stock}` : "Stok: Habis"}
                </Typography>
                <Rating name="read-only" value={4.5} precision={0.5} readOnly sx={{ display: 'flex', justifyContent: 'center' }} />
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/product/detail/${product_id}`)}
                    sx={{
                        backgroundColor: '#00A63F',
                        '&:hover': {
                            backgroundColor: '#00A66F',
                        },
                        flex: 1,
                        marginRight: '10px',
                    }}
                >
                    Detail
                </Button>
                <Button
                    variant="outlined"
                    disabled={stock === 0}
                    onClick={() => onAddToCart(product_id)}
                    sx={{
                        borderColor: '#00A63F',
                        color: '#00A63F',
                        '&:hover': {
                            borderColor: '#00A66F',
                            color: '#00A66F',
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
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);
    const query = searchParams.get('search') || '';

    const displayedProducts = query.trim() === "" ? products : results;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/search', {
                    params: { query },
                });
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, [query]);

    const handleAddToCart = async (id) => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token');

            if (!token) {

                Toast.fire({
                    icon: 'error',
                    title: 'Please log in first',
                });
                return;
            }

            const data = { id_product: id };

            const response = await axios.post(
                'http://localhost:5000/cart/add-product',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                }
            );

            if (response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: 'Product added to cart!',
                });
                setLoading(false)
            } else {
                setLoading(false)
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add product. Please try again!',
                });
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) {

                    Toast.fire({
                        icon: 'error',
                        title: data.message,
                    });
                } else if (status === 409) {

                    Toast.fire({
                        icon: 'warning',
                        title: data.message,
                    });
                } else if (status >= 500) {

                    Toast.fire({
                        icon: 'error',
                        title: 'Server error. Please try again later.',
                    });
                }
            } else if (error.request) {
                setLoading(false)

                Toast.fire({
                    icon: 'error',
                    title: 'Network error. Please check your internet connection.',
                });
            } else {
                setLoading(false)

                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add product. Please try again.',
                });
            }
        }
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


    useEffect(() => {
        const fetchProducts = async () => {
            if (query.trim() === "") return;
            try {
                const response = await axios.get('http://localhost:5000/admin/product/search', {
                    params: { query },
                });
                setResults(response.data);

                if (response.data.length === 0) {
                    Toast.fire({
                        icon: 'info',
                        title: 'No products found for your search.',
                    });
                }
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, [query]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                background: 'linear-gradient(to bottom, white, white)',
            }}
        >
            <Container>
            {displayedProducts.length > 0 && (
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
                    Produk Kami
                </Typography>
            )}
                {displayedProducts.length === 0 && (
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            color: '#FF0000',
                            marginTop: '-150px',
                        }}
                    >
                        Maaf, produk tidak ditemukan. Silakan coba kata kunci lain.
                    </Typography>
                )}
                <Grid container spacing={3} justifyContent="center">
                    {displayedProducts.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard
                                product_id={product._id}
                                product_name={product.product_name}
                                harga={product.harga}
                                description={product.description}
                                stock={product.stock}
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

import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from './productCard';

import getProducts from '../api/productListApi';

function ShopCard() {

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
        <Box sx={{ backgroundColor: 'white' }}>
            <Container sx={{ paddingTop: 8, paddingBottom: 8 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'black', marginBottom: 7 }}>
                    Our PCB Products
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default ShopCard;
import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from './productCard';
import pcb1 from '../assets/images/pcb1.jpeg';
import pcb2 from '../assets/images/pcb2.jpg';
import pcb3 from '../assets/images/pcb3.jpg';
import pcb4 from '../assets/images/pcb4.jpg';

const products = [
    {
        id: 1,
        name: 'PCB 4 Layer - High Quality',
        price: 'Rp 500,000',
        image: pcb1,
    },
    {
        id: 2,
        name: 'PCB 6 Layer - Custom Design',
        price: 'Rp 750,000',
        image: pcb2,
    },
    {
        id: 3,
        name: 'PCB 8 Layer - Premium Build',
        price: 'Rp 1,000,000',
        image: pcb3,
    },
    {
        id: 4,
        name: 'PCB 10 Layer - VVIP Build',
        price: 'Rp 1,500,000',
        image: pcb4,
    },
];

function ShopCard() {
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
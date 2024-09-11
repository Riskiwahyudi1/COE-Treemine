import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function ProductCard({ product }) {
    return (
        <Card
            sx={{
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    {product.price}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                    Buy Now
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProductCard;

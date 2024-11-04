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
                src={`http://localhost:5000${product.picture_url}`}
                alt={product.picture_url}
            />
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {product.product_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                 Rp.{product.harga.toLocaleString('id-ID')}
                </Typography>
                <Button variant="contained" fullWidth sx={{  bgcolor: '#d565be', color: 'white' }}>
                    Buy Now
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProductCard;

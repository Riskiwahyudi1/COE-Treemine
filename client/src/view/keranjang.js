import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Checkbox, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import getProductsInCart from '../api/cartApi';

const ShoppingCartItem = ({ name, initialQty, price, image }) => {
    const [quantity, setQuantity] = useState(initialQty);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
            <Checkbox />
            <Box component="img" src={`http://localhost:5000${image}`} alt={name} sx={{ width: 80, height: 80, mr: 2 }} />
            <Box sx={{ width: '20%' }}>
                <Typography>{name}</Typography>
            </Box>
            <Box sx={{ width: '15%', display: 'flex', alignItems: 'center' }}>
                <Button variant="text" onClick={handleDecrement}>
                    -
                </Button>
                <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                <Button variant="text" onClick={handleIncrement}>
                    +
                </Button>
            </Box>
            <Typography sx={{ width: '20%' }}>{`Rp. ${(price * quantity).toLocaleString()}`}</Typography>
            <Typography sx={{ width: '20%', color: 'blue', cursor: 'pointer' }}>view detail</Typography>
            <IconButton color="default">
                <DeleteIcon />
            </IconButton>
            <IconButton color="default">
                <EditIcon />
            </IconButton>
        </Box>
    );
};

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [productListInCart, setCartList] = useState([]);

    const handleBack = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchCartList = async () => {
            try {
                const data = await getProductsInCart();
                setCartList(data);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };
        fetchCartList();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            {/* Back Button */}
            <Box onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1 }}>
                    Shopping Cart
                </Typography>
            </Box>

            {/* Header Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox />
                <Typography sx={{ width: '20%', fontWeight: 'bold' }}>All</Typography>
                <Typography sx={{ width: '15%', fontWeight: 'bold' }}>Qty</Typography>
                <Typography sx={{ width: '20%', fontWeight: 'bold' }}>Price</Typography>
                <Typography sx={{ width: '20%', fontWeight: 'bold' }}>Detail</Typography>
            </Box>
            <Divider />

            {/* Cart Items */}
            {productListInCart.map((product) => (
                <Box key={product.id}>
                    <ShoppingCartItem
                        name={product.id_product?.product_name}
                        initialQty={1}
                        price={product.id_product?.harga}
                        image={product.id_product?.picture_url}
                    />
                    <Divider />
                </Box>
            ))}

            {/* Buy Now Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" sx={{ backgroundColor: '#7f91eb', color: '#fff' }}>
                    Beli Sekarang
                </Button>
            </Box>
        </Box>
    );
};

export default ShoppingCart;

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Checkbox, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import getProductsInCart from '../api/cartApi';
import axios from 'axios';
import Swal from 'sweetalert2';

const showToast = (message, icon) => {
    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
};

const ShoppingCartItem = ({ id, name, initialQty, price, image, onDelete }) => {
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
            <IconButton color="default" onClick={() => onDelete(id)}>
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

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            
            const token = localStorage.getItem('token');
            try {
                const response = await axios.delete(`http://localhost:5000/cart/delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                    }
                });
                setCartList((prevList) => prevList.filter((product) => product._id !== id));
                if (response.status === 200) {
                    showToast('Product has been deleted', 'success');
                }
            } catch (error) {
                showToast('Failed to delete product', 'error');
            }
        }

    };

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
                <Box key={product.id_product?._id}>
                    <ShoppingCartItem
                        id={product._id}
                        name={product.id_product?.product_name || 'Unnamed Product'}
                        initialQty={1}
                        price={product.id_product?.harga || 0}
                        image={product.id_product?.picture_url || ''}
                        onDelete={handleDelete}
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

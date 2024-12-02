import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getRequestCostomPrototype } from '../api/requestCostomPrototypeApi';

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

const ShoppingCartItem = ({ id, name, price, onDelete }) => {
    return (
        <Card
            elevation={3}
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 2,
                backgroundColor: '#f9f9f9',
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{name}</Typography>
                <Typography fontWeight="bold" color="primary">{`Rp. ${price.toLocaleString()}`}</Typography>
            </CardContent>
            <CardActions>
                <IconButton color="error" onClick={() => onDelete(id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [requestPrototype, setRequestPrototype] = useState([]);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchRequestPrototype = async () => {
            try {
                const data = await getRequestCostomPrototype();
                setRequestPrototype(data);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };
        fetchRequestPrototype();
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
                await axios.delete(`http://localhost:5000/cart/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRequestPrototype((prevList) =>
                    prevList.filter((product) => product._id !== id)
                );
                showToast('Product has been deleted', 'success');
            } catch (error) {
                showToast('Failed to delete product', 'error');
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh',
                p: 3,
                backgroundColor: '#f3f4f6',
            }}
        >
            <Box onClick={handleBack} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
                    Shopping Cart
                </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
                {Array.isArray(requestPrototype) && requestPrototype.length > 0 ? (
                    requestPrototype.map((order) => (
                        <ShoppingCartItem
                            key={order._id}
                            id={order._id}
                            name={order.name}
                            price={order.total_cost}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            textAlign: 'center',
                            py: 10,
                            backgroundColor: '#ffffff',
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Your shopping cart is empty.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: '#7f91eb',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#5a6dd6',
                                },
                            }}
                            onClick={() => navigate('/')}
                        >
                            Continue Shopping
                        </Button>
                    </Paper>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 'auto',
                    py: 2,
                    px: 3,
                    backgroundColor: '#fff',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="h6">{`Total: Rp. ${requestPrototype
                    .reduce((acc, order) => acc + order.total_cost, 0)
                    .toLocaleString()}`}</Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: '#00A63F',
                        color: '#fff',
                        borderRadius: 3,
                        padding: '10px 30px',
                        '&:hover': {
                            backgroundColor: '#007F2E',
                        },
                    }}
                >
                    Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default ShoppingCart;

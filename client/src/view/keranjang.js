import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Checkbox,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import getProductsInCart from '../api/cartApi';

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

const ShoppingCartItem = ({
    id,
    name,
    quantity,
    price,
    image,
    onDelete,
    onQuantityChange,
    isChecked,
    onSelect,
    onView,
}) => {
    const handleIncrement = () => {
        onQuantityChange(id, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(id, quantity - 1);
        }
    };

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
            <Checkbox
                checked={isChecked}
                onChange={(e) => onSelect(id, e.target.checked)}
                sx={{ marginRight: 2 }}
            />
            <CardMedia
                component="img"
                image={`http://localhost:5000${image}`}
                alt={name}
                sx={{ width: 120, height: 120, borderRadius: 2, cursor: 'pointer' }}
                onClick={() => onView(id)}
            />
            <CardContent sx={{ flex: 1, ml: 2 }}>
                <Typography variant="h6">{name}</Typography>
                <Typography color="text.secondary">{`Rp. ${price.toLocaleString()} x ${quantity}`}</Typography>
                <Typography fontWeight="bold" color="primary">
                    {`Rp. ${(price * quantity).toLocaleString()}`}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleDecrement}
                        sx={{
                            minWidth: 30,
                            padding: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        -
                    </Button>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                        {quantity}
                    </Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleIncrement}
                        sx={{
                            minWidth: 30,
                            padding: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        +
                    </Button>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" variant="text" color="primary" onClick={() => onView(id)}>
                    View Product
                </Button>
                <IconButton color="error" onClick={() => onDelete(id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [productListInCart, setCartList] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

    const handleBack = () => {
        navigate(-1);
    };

    const handleViewProduct = (id) => {
        navigate(`/product/detail/${id}`);
    };

    useEffect(() => {
        const fetchCartList = async () => {
            try {
                const data = await getProductsInCart();
                const initialSelected = {};
                data.forEach((product) => {
                    initialSelected[product._id] = false;
                });
                setCartList(data);
                setSelectedItems(initialSelected);
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
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartList((prevList) => prevList.filter((product) => product._id !== id));
                const newSelectedItems = { ...selectedItems };
                delete newSelectedItems[id];
                setSelectedItems(newSelectedItems);
                if (response.status === 200) {
                    showToast('Product has been deleted', 'success');
                }
            } catch (error) {
                showToast('Failed to delete product', 'error');
            }
        }
    };

    const handleQuantityChange = (id, newQuantity) => {
        setCartList((prevList) =>
            prevList.map((product) =>
                product._id === id ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    const handleSelect = (id, isChecked) => {
        setSelectedItems((prevSelected) => ({
            ...prevSelected,
            [id]: isChecked,
        }));
    };

    const getTotalPrice = () => {
        return productListInCart
            .filter((product) => selectedItems[product._id])
            .reduce((acc, product) => acc + product.id_product.harga * (product.quantity || 1), 0);
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
                {productListInCart.length > 0 ? (
                    productListInCart.map((product) => (
                        <ShoppingCartItem
                            key={product._id}
                            id={product._id}
                            name={product.id_product?.product_name || 'Unnamed Product'}
                            quantity={product.quantity || 1}
                            price={product.id_product?.harga || 0}
                            image={product.id_product?.picture_url || ''}
                            onDelete={handleDelete}
                            onQuantityChange={handleQuantityChange}
                            isChecked={selectedItems[product._id]}
                            onSelect={handleSelect}
                            onView={handleViewProduct}
                        />
                    ))
                ) : (
                    <Paper elevation={0} sx={{ textAlign: 'center', py: 10, backgroundColor: '#ffffff', borderRadius: 2 }}>
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
                <Typography variant="h6">{`Total: Rp. ${getTotalPrice().toLocaleString()}`}</Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: '#7f91eb',
                        color: '#fff',
                        borderRadius: 3,
                        padding: '10px 30px',
                        '&:hover': {
                            backgroundColor: '#5a6dd6',
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

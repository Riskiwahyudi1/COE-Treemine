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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import getProductsInCart from '../api/cartApi';
import Toast from '../utils/Toast'
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';

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
    stock
}) => {
    const handleIncrement = () => {
        if (quantity < stock) {
            onQuantityChange(id, quantity + 1);
        }
        if (quantity == stock) {
            Toast.fire({
                icon: 'info',
                title: 'Tidak bisa menambah melebihi stok!',
            });
        }
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
                flexDirection: { xs: 'column', sm: 'row' },
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
                sx={{ marginRight: { sm: 2, xs: 0 }, mb: { xs: 1, sm: 0 } }}
                disabled={stock === 0}
            />
            <CardMedia
                component="img"
                image={`${apiConfig.baseURL}${image}`}
                alt={name}
                sx={{
                    width: { xs: '100%', sm: 120 },
                    height: { xs: 'auto', sm: 120 },
                    borderRadius: 2,
                    cursor: 'pointer',
                    mb: { xs: 2, sm: 0 },
                }}
                onClick={() => onView(id)}
            />
            <CardContent sx={{ flex: 1, ml: { sm: 2, xs: 0 }, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6">{name}</Typography>
                <Typography
                    color={stock > 10 ? "#00A63F" : stock > 0 ? "warning" : "#FF0000"}
                >
                    {stock > 0 ? `Stok: ${stock}` : "Stok: Habis"}
                </Typography>
                <Typography color="text.secondary">{`Rp. ${price.toLocaleString()} x ${quantity}`}</Typography>
                <Typography fontWeight="bold" color="primary">
                    {`Rp. ${(price * quantity).toLocaleString()}`}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mt: 1 }}>
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
            <CardActions sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <IconButton color="error" onClick={() => onDelete(id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>

    );
};

const ShoppingCart = () => {
    const navigate = useNavigate();
    const { userToken } = useAuth(); 
    const [productListInCart, setCartList] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

    const handleBack = () => {
        navigate('/');
    };

    const handleLinkCostom = () => {
        navigate('./costom-product');
    };

    const handleViewProduct = (id) => {
        navigate(`/product/detail/${id}`);
    };
    const handleCostomCart = () => {
        navigate(`./costom-product`);
    };

    useEffect(() => {
        const fetchCartList = async () => {
            try {
                const data = await getProductsInCart(userToken);
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
            
            try {
                const response = await axios.delete(`${apiConfig.baseURL}cart/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
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

    const handleCheckout = () => {
        navigate("/checkout", {
            state: {
                productListInCart,
                selectedItems
            }
        });
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    px: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    padding: '10px',
                }}
            >
                {/* Bagian Kiri - Tombol Back */}
                <Box onClick={handleBack} sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
                        Keranjang Produk
                    </Typography>
                </Box>

                {/* Bagian Kanan - Custom Card dengan panah */}
                <Box onClick={handleCostomCart} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mr: 1 }}>
                        Keranjang Custom
                    </Typography>
                    <IconButton>
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
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
                            stock={product.id_product?.stock}
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
                    onClick={handleCheckout}
                    sx={{
                        backgroundColor: '#00A63F',
                        color: '#fff',
                        borderRadius: 3,
                        padding: '10px 30px',
                        '&:hover': {
                            backgroundColor: '#00A64J',
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

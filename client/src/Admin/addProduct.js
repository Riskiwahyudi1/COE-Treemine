import React, { useState, useEffect } from 'react';
import {
    CardContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
    Box,
    Card,
    Alert,
    CircularProgress, 
} from '@mui/material';
import { CalendarToday as Calendar } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import getCategories from './api/categoriesApi';
import Swal from 'sweetalert2';

import axios from 'axios';


// Setup Toast untuk notifikasi
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
  
export default function ProductForm() {
    const [formData, setFormData] = useState({
        product_name: '',
        id_category: '',
        harga: '',
        stock: '',
        description: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate(); 
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const data = await getCategories();
            setCategories(data);
          } catch (error) {
            setError('Failed to load categories');
          }
        };
        fetchCategories();
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData((prevData) => ({ ...prevData, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setError('Please upload a valid image.');
        }
    };

    const handleBack = () => {
        navigate('/admin'); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        // Validasi input
        if (!formData.product_name || !formData.id_category || !formData.harga || !formData.stock || !formData.description || !formData.image) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
    
        try {
            const data = new FormData();
            data.append('product_name', formData.product_name);
            data.append('id_category', formData.id_category);
            data.append('harga', formData.harga);
            data.append('stock', formData.stock);
            data.append('description', formData.description);
            data.append('image', formData.image);
        
            const response = await axios.post(
                'http://localhost:5000/admin/product',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            );
            
            if (response.status === 201) { 
                Toast.fire({
                    icon: 'success',
                    title: 'Product added successfully',
                });
                navigate('/admin', { state: { showToast: true } });
            } else {
                setError('Failed to add product. Please try again!');
            }
            
        } catch (error) {
            if (error.response) {
                setError(`Failed: ${error.response.data.message || 'Unknown error'}`);
            } else {
                console.error('Error:', error.message);
                setError('Failed to add product. Please try again.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Card sx={{ borderRadius: 4 }}>
            <CardContent sx={{ backgroundColor: 'white' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Add Product
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <Calendar sx={{ fontSize: 16, mr: 1 }} />
                        <span>{new Date().toLocaleDateString()}</span>
                    </Box>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* Left Side */}
                        <Box sx={{ flex: 1, mr: 2 }}>
                            <TextField
                                label="Product Name"
                                name="product_name"
                                value={formData.product_name}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2, bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                                required
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="id_category"
                                    value={formData.id_category}
                                    onChange={handleChange}
                                    sx={{ bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                                    required
                                >
                                    {categories.map((cat) => (
                                    <MenuItem key={cat._id} value={cat._id}>
                                        {cat.nama} 
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Price"
                                type="number"
                                name="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2, bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                                required
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Stock</InputLabel>
                                <Select
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    sx={{ bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                                    required
                                >
                                    <MenuItem value="in-stock">In Stock</MenuItem>
                                    <MenuItem value="out-of-stock">Out of Stock</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Right Side */}
                        <Box sx={{ flex: 1, ml: 2 }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography sx={{ mb: 1 }}>Image</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            type="file"
                                            style={{ width: 128, height: 128, objectFit: 'cover', borderRadius: 4 }}
                                        />
                                    )}
                                    <Button
                                        component="label"
                                        variant="contained"
                                        sx={{ bgcolor: '#982953', '&:hover': { bgcolor: '#78203f' } }}
                                    >
                                        Choose File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </Button>
                                </Box>
                            </Box>

                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2, bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                                required
                            />
                            {error && <Alert severity="error">{error}</Alert>}

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'save'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        borderColor: '#9c27b0',
                                        color: '#9c27b0',
                                        '&:hover': { borderColor: '#7b1fa2', color: '#7b1fa2' },
                                    }}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
}

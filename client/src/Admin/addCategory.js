import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Paper,
    IconButton,
    Alert,
    CircularProgress,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../utils/Toast';
import { useAuth } from '../contexts/AuthContext';

const UpdateCategoryPage = () => {
    const { adminToken } = useAuth(); 

    const [formData, setFormData] = useState({
        category_name: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

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
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validasi input
        if (!formData.category_name || !formData.image) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('category_name', formData.category_name);
            data.append('image', formData.image);
        
            if (!adminToken) {
                setError('Kamu tidak terountetikasi, silahkan login kembali!');
                setLoading(false);
                return;
            }
       
            const response = await axios.post(
                'http://localhost:5000/admin/product/categories/add',
                data,
                {
                     headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${adminToken}`, 
                    },
                }
            );
        
            if (response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: 'Category added successfully',
                });
                navigate('/admin/kategoriPortofolio', { state: { showToast: true } });
            } else {
                setError('Failed to add category. Please try again!');
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;
        
                if (status === 400 && data.errors) {
                    // Error validasi dari express-validator
                    setError(data.errors.map((err) => err.msg).join(', ')); // Gabungkan semua pesan error
                } else if (status >= 500) {
                    setError('Server error. Please try again later.');
                } else {
                    setError(data.message || 'An unexpected error occurred.');
                }
            } else if (error.request) {
                setError('Network error. Please check your internet connection.');
            } else {
                console.error('Error:', error.message);
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
        
    };

    const handleBack = () => {
        navigate('/admin/kategoriPortofolio');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">
                        Add Category
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" mr={1}>
                            {new Date().toLocaleDateString()}
                        </Typography>
                        <IconButton>
                            <CalendarTodayIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Form Section */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Image Upload Section */}
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Category Image
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                        width: 128,
                                        height: 128,
                                        objectFit: 'cover',
                                        borderRadius: 8,
                                    }}
                                />
                            )}
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ backgroundColor: '#982953' }}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Box>
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                width: '150px',
                                fontWeight: 'bold',
                                borderColor: '#9c27b0',
                                color: '#9c27b0',
                            }}
                            onClick={handleBack}
                        >
                            BACK
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '150px',
                                backgroundColor: '#4caf50',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#45a049' },
                            }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'SAVE'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default UpdateCategoryPage;

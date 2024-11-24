import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Toast from '../utils/Toast';

const UpdateCategoryPage = () => {
    const [formData, setFormData] = useState({
        category_name: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admin/product/categories/${id}`);
                setFormData({
                    category_name: response.data.category_name || '',
                    image: response.data.picture_url || '',
                });
                if (response.data.image_url) {
                    setImagePreview(response.data.picture_url);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
                setError('Failed to fetch category data.');
            }
        };
        fetchCategory();
    }, [id]);

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

        if (!formData.category_name || (!formData.image && !imagePreview)) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('category_name', formData.category_name);
            if (formData.image) {
                data.append('image', formData.image);
            }
        
            const response = await axios.put(
                `http://localhost:5000/admin/product/categories/edit/${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
        
            if (response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Category updated successfully',
                });
                navigate('/admin/kategoriPortofolio', { state: { showToast: true } });
            } else {
                setError('Failed to update category. Please try again!');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
        
                if (status === 400 && data.errors) {
                    const errors = data.errors.map((err) => err.msg).join(', ');
                    setError(errors);
                } else if (status >= 500) {
                    setError('Server error. Please try again later.');
                } else {
                    setError(data.message || 'An error occurred. Please try again.');
                }
            } else if (error.request) {
                setError('Network error. Please check your internet connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/admin/category');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">
                        Edit Category
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
                                Change Image
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

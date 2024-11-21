import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Paper,
    IconButton
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';

const UpdateCategoryPage = () => {
    const [categoryName, setCategoryName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Category submitted:', { categoryName, imagePreview });
    };

    const handleBack = () => {
        navigate('/admin/category');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">
                        Update Category
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
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                                        borderRadius: 8 
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

                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                width: '150px',
                                fontWeight: 'bold',
                                borderColor: '#9c27b0',
                                color: '#9c27b0'
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
                                '&:hover': { backgroundColor: '#45a049' }
                            }}
                        >
                            SAVE
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default UpdateCategoryPage;
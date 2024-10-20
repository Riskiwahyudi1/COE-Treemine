import React, { useState } from 'react';
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
    Card
} from '@mui/material';
import { CalendarToday as Calendar } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ProductForm() {
    const [setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate(); // Initialize navigate hook

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        navigate('./dataProduct'); // Navigate to admin/dashboard when Back is clicked
    };

    return (
        <Card sx={{ borderRadius: 4 }}> {/* Rounded corners applied here */}
            <CardContent sx={{ backgroundColor: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Portfolio</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <Calendar sx={{ fontSize: 16, mr: 1 }} />
                        <span>Mon, 18 September 2024</span>
                    </Box>
                </Box>

                <form>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* Left Side */}
                        <Box sx={{ flex: 1, mr: 2 }}>
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2, bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    label="Category"
                                    sx={{ bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                                >
                                    <MenuItem value="electronics">Electronics</MenuItem>
                                    <MenuItem value="clothing">Clothing</MenuItem>
                                    <MenuItem value="books">Books</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Price"
                                type="number"
                                fullWidth
                                sx={{ mb: 2, bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Stock</InputLabel>
                                <Select
                                    label="Stock"
                                    sx={{ bgcolor: 'rgba(255, 192, 203, 0.1)' }}
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
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2, bgcolor: 'rgba(255, 192, 203, 0.1)' }}
                            />

                            {/* Buttons Section */}
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ borderColor: '#9c27b0', color: '#9c27b0', '&:hover': { borderColor: '#7b1fa2', color: '#7b1fa2' } }}
                                    onClick={handleBack} // Handle the Back button click
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

import React from 'react';
import {
    Paper,
    Grid,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CustomAssembly = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk handling navigasi
    const handleBack = () => {
        navigate('/custom'); // Navigasi ke halaman custom prototype
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: '#E6F0FF', alignItems: 'flex-start' }}>
            {/* Left Panel */}
            <Paper sx={{ flex: 2, p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleBack}
                        sx={{
                            bgcolor: '#54cbbb',
                            color: 'white',
                            p: 1,
                            borderRadius: 1,
                            '&:hover': { bgcolor: '#54cbbb' }
                        }}
                    >
                        Back
                    </Button>
                    <Typography
                        sx={{
                            bgcolor: '#54cbbb',
                            color: 'white',
                            p: 1,
                            borderRadius: 1,
                            width: 'fit-content'
                        }}
                    >
                        Custom Assembly
                    </Typography>
                </Box>

                {/* Rest of left panel content remains the same */}
                {/* ... */}
                <Grid container spacing={2}>
                    {/* 3 Flexible options */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>3 Flexible options</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField size="small" sx={{ flex: 1 }} />
                            <TextField size="small" sx={{ flex: 1 }} />
                            <TextField size="small" sx={{ flex: 1 }} />
                        </Box>
                    </Grid>

                    {/* Board type */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>Board type</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField size="small" sx={{ flex: 1 }} />
                            <TextField size="small" sx={{ flex: 1 }} />
                            <TextField size="small" sx={{ flex: 1 }} />
                        </Box>
                    </Grid>

                    {/* Assembly */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>Assembly</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField size="small" sx={{ flex: 1 }} />
                            <TextField size="small" sx={{ flex: 1 }} />
                            <TextField size="small" sx={{ flex: 1 }} />
                        </Box>
                    </Grid>

                    {/* Quantity */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>Quantity</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField size="small" sx={{ width: '33%' }} />
                        </Box>
                    </Grid>

                    {/* Pay Attentions - First Row */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>Pay Attentions</Typography>
                                <Typography variant="caption" sx={{ color: 'grey.600', mb: 0.5 }}>sdbubdulvbsdu/ndsfdheui</Typography>
                                <RadioGroup row>
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                </RadioGroup>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>Pay Attentions</Typography>
                                <Typography variant="caption" sx={{ color: 'grey.600', mb: 0.5 }}>sdbubdulvbsdu/ndsfdheui</Typography>
                                <RadioGroup row>
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Number fields row */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>Number of Unique</Typography>
                                <TextField size="small" fullWidth />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>Number of BGA/QFP</Typography>
                                <TextField size="small" fullWidth />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Second number fields row */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>Number of SMD</Typography>
                                <TextField size="small" fullWidth />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>Number of BGA</Typography>
                                <TextField size="small" fullWidth />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Additional Pay Attentions */}
                    {[1, 2, 3].map((index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>Pay Attentions</Typography>
                            <RadioGroup row>
                                <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                            </RadioGroup>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Right Panel */}
            <Paper sx={{ width: '33%', p: 2, alignSelf: 'flex-start' }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Pricing and build Time
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>PCB Cost:</Typography>
                        <Typography>Rp. 210.000</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Shipping:</Typography>
                        <Typography>Rp. 30.000</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Total:</Typography>
                        <Typography>Rp. 240.000</Typography>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    Save To Cart
                </Button>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: '#F87171',
                            '&:hover': { bgcolor: '#DC2626' }
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: '#86EFAC',
                            color: 'black',
                            '&:hover': { bgcolor: '#4ADE80' }
                        }}
                    >
                        Calculate
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default CustomAssembly;
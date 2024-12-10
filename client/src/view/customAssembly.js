import React, { useState } from 'react';
import {
    Paper,
    Grid,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Box,
    FormControl,
    FormLabel,
    Checkbox,
    Divider,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const CustomAssembly = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/custom');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 3,
                p: 3,
                bgcolor: '#F4F6F8',
                alignItems: 'flex-start',
                minHeight: '100vh',
            }}
        >
            {/* Left Panel */}
            <Paper
                elevation={3}
                sx={{
                    flex: 2,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF',
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box
                            sx={{
                                bgcolor: '#00A63F',
                                color: '#FFFFFF',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                display: 'inline-flex',
                                alignItems: 'center',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                                Custom Assembly
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    {/* Flexible Options */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                3 Flexible Options
                            </FormLabel>
                            <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Turnkey"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Kitted or Consigned"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Combo"
                                />
                            </Box>
                        </FormControl>
                    </Grid>

                    {/* Board Type */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                Board Type
                            </FormLabel>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="singlePiece"
                                    control={<Radio />}
                                    label="Single Piece"
                                />
                                <FormControlLabel
                                    value="panelized"
                                    control={<Radio />}
                                    label="Panelized PCBs"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Assembly Side */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                Assembly Side(s)
                            </FormLabel>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="topSide"
                                    control={<Radio />}
                                    label="Top Side"
                                />
                                <FormControlLabel
                                    value="bottomSide"
                                    control={<Radio />}
                                    label="Bottom Side"
                                />
                                <FormControlLabel
                                    value="bothSides"
                                    control={<Radio />}
                                    label="Both Sides"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Quantity */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                Quantity*
                            </FormLabel>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mt: 1,
                                }}
                            >
                                <TextField
                                    size="small"
                                    placeholder="Enter quantity"
                                    sx={{ width: '30%' }}
                                />
                                <Typography>pcs</Typography>
                            </Box>
                        </FormControl>
                    </Grid>

                    {/* Sensitive Components */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                Contains Sensitive Components/Parts
                            </FormLabel>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Chinese Parts */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                Accept Alternatives Made in China
                            </FormLabel>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Parts Count */}
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                            Parts Information
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <TextField
                                label="Number of Unique Parts"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Number of SMD Parts"
                                size="small"
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Number of BGA/QFP Parts"
                                size="small"
                                fullWidth
                            />
                        </Box>
                    </Grid>

                    {/* Additional Options */}
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                            Additional Options
                        </Typography>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Dispanel the Boards to Delivery"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Cable Wire Harness Assembly"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Assembly Test"
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Right Panel */}
            <Paper sx={{ width: "33%", p: 2, alignSelf: "flex-start" }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Kalkulasi Harga
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Harga PCB:</Typography>
                        <Typography>Rp. </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Total:</Typography>
                        <Typography>Rp. </Typography>
                    </Box>
                </Box>

                <Button type="submit" variant="contained" onClick="" fullWidth sx={{ mb: 2, backgroundColor: '#00A63F', color: '#fff' }}>
                    Simpan Ke Keranjang
                </Button>
            </Paper>
        </Box>
    );
};

export default CustomAssembly;

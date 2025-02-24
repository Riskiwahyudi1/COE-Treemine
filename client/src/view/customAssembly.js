import React, { useState, useEffect } from 'react';
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
    ToggleButton,
    IconButton,
    ToggleButtonGroup
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getAssemblyItem } from '../api/costomAssemblyApi';
import Toast from '../utils/Toast';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';

const CustomAssembly = () => {
    const navigate = useNavigate();
    const { userToken } = useAuth(); 
    const [partList, setPartList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        
        flexible_option: '',
        board_type: '',
        assembly_side: '',
        quantity: '',
        pay_attention: '',
        notes: '',
        number_unik_part: "",
        number_SMD_part: "",
        number_BGA_QFP: "",
        throught_hole: "",
        board_to_delivery: '',
        function_test: '',
        cable_wire_harness_assembly: '',
        detail_information: '',
        total_cost: 0,
    });

    const [getCost, setGetCost] = useState({
        flexible_option: 0,
        board_type: 0,
        assembly_side: 0,
        quantity: 0,
        pay_attention: 0,
        notes: 0,
        number_unik_part: 0,
        number_SMD_part: 0,
        number_BGA_QFP: 0,
        throught_hole: 0,
        board_to_delivery: 0,
        function_test: 0,
        cable_wire_harness_assembly: 0,
        detail_information: 0,
    });

    const [totalCost, setTotalCost] = useState(0);

    const handleBack = () => {
        navigate('/custom');
    };
    useEffect(() => {
        const fetchAssemblyItem = async () => {
            try {
                const data = await getAssemblyItem();
                setPartList(data);
            } catch (error) {
                setError('Failed to load item');
            }
        };
        fetchAssemblyItem();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue;

        try {

            parsedValue = JSON.parse(value);
        } catch (error) {

            parsedValue = value;
        }

        if (typeof parsedValue === 'object' && parsedValue !== null) {

            setFormData((prevData) => ({
                ...prevData,
                [name]: parsedValue.type,
            }));

            setGetCost((prevCost) => {
                const updatedCost = {
                    ...prevCost,
                    [name]: parseFloat(parsedValue.cost) || 0,
                };

                // total harga X jumlah pemesanan
                const total = Object.values(updatedCost).reduce((acc, val) => acc + val, 0);
                setTotalCost(total);

                return updatedCost;
            });
        } else {

            setFormData((prevData) => ({
                ...prevData,
                [name]: parsedValue,
            }));
        }
    };
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            total_cost: totalCost,
        }));
    }, [totalCost]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validasi Input
        // Validasi Input
        const requiredFields = [
            'flexible_option',
            'board_type',
            'assembly_side',
            'quantity',
            'pay_attention',
            'notes',
            'number_unik_part',
            'number_SMD_part',
            'number_BGA_QFP',
            'throught_hole',
            'board_to_delivery',
            'function_test',
            'cable_wire_harness_assembly',
            'detail_information'
        ];

        const missingFields = requiredFields.filter((field) => {
            const fieldValue = formData[field];
            return typeof fieldValue === 'string' && fieldValue.trim() === '';
        });
        if (missingFields.length > 0) {
            const formattedMissingFields = missingFields.map(field => field.replace(/_/g, ' '));
            Toast.fire({
                icon: 'error',
                title: `Mohon pilih "${formattedMissingFields[0] }"!`,
            });
            setLoading(false);
            return;
        }

        try {
            

            if (!userToken) {
                setError('Unauthorized access. Please log in first.');
                Toast.fire({
                    icon: 'error',
                    title: 'Please log in first',
                });
                return;
            }

            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            const response = await axios.post(
                `${apiConfig.baseURL}costom-assembly/request-costom`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                }
            );

            if (response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: 'Data submitted successfully',
                });
                navigate('../keranjang/costom-product', { state: { showToast: true } });
            } else {
                setError(response.data?.message || 'Failed to submit data. Please try again!');
            }

        } catch (error) {
            const message =
                error.response?.data?.errors?.[0]?.msg ||
                error.response?.data?.message ||
                (error.response?.status >= 500
                    ? 'Server error. Please try again later.'
                    : 'Failed to submit data. Please check your connection.');
            setError(message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <form>
            {partList && (
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
                            {partList?.map((part, index) => {
                                {
                                    if (part.type === '3 Flexible Options' && part.data?.length > 0) {
                                        return (
                                            <Grid item xs={12} key={index}>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333', mb: '10px' }}>
                                                    3 Flexible Options
                                                </Typography>
                                                <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                    {part.data.map((obj, idx) => (
                                                        <FormControlLabel
                                                            name="flexible_option"
                                                            key={idx}
                                                            value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                            control={<Radio />}
                                                            label={obj.type}
                                                            onChange={handleChange}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </Grid>
                                        );
                                    }
                                }

                                {/* Board Type */ }
                                if (part.type === 'Board Type' && part.data?.length > 0) {
                                    return (

                                        <Grid item xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                                    Board Type
                                                </FormLabel>
                                                <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                    {part.data.map((obj, idx) => (
                                                        <FormControlLabel
                                                            name="board_type"
                                                            key={idx}
                                                            value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                            control={<Radio />}
                                                            label={obj.type}
                                                            onChange={handleChange}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    )
                                }

                                if (part.type === 'Assembly Side(s)' && part.data?.length > 0) {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                                        Assembly Side(s)
                                                    </FormLabel>
                                                    <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                        {part.data.map((obj, idx) => (
                                                            <FormControlLabel
                                                                name="assembly_side"
                                                                key={idx}
                                                                value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                control={<Radio />}
                                                                label={obj.type}
                                                                onChange={handleChange}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
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
                                                        onChange={handleChange}
                                                    >
                                                        <TextField
                                                            name="quantity"
                                                            value={formData.quantity}
                                                            size="small"
                                                            placeholder="Enter quantity"
                                                            sx={{ width: '30%' }}
                                                        />
                                                        <Typography>pcs</Typography>
                                                    </Box>
                                                </FormControl>
                                            </Grid>
                                        </>
                                    )
                                }

                                {/* Sensitive Components */ }
                                if (part.type === 'Pay Attention' && part.data?.length > 0) {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                                        Contains Sensitive Components/Parts
                                                    </FormLabel>
                                                    <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                        {part.data.map((obj, idx) => (
                                                            <FormControlLabel
                                                                name="pay_attention"
                                                                key={idx}
                                                                value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                control={<Radio />}
                                                                label={obj.type}
                                                                onChange={handleChange}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                    <TextField
                                                        name="notes"
                                                        label="write your through here.."
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={2}
                                                        onChange={handleChange}
                                                        value={formData.notes}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            {/* Parts Count */}
                                            <Grid item xs={12}>
                                                <Typography sx={{ fontWeight: 'bold', mb: 2 }}>
                                                    Parts Information
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                                    <TextField
                                                        name="number_unik_part"
                                                        label="Number of Unique Parts"
                                                        size="small"
                                                        value={formData.number_unik_part || ""} // Pastikan value terkait formData
                                                        onChange={handleChange} // Handle perubahan nilai input
                                                        sx={{ flex: '1 1 calc(50% - 8px)' }}
                                                    />
                                                    <TextField
                                                        name="number_SMD_part"
                                                        label="Number of SMD Parts"
                                                        size="small"
                                                        value={formData.number_SMD_part || ""} // Sinkronisasi dengan formData
                                                        onChange={handleChange}
                                                        sx={{ flex: '1 1 calc(50% - 8px)' }}
                                                    />
                                                    <TextField
                                                        name="number_BGA_QFP"
                                                        label="Number of BGA/QFP Parts"
                                                        size="small"
                                                        value={formData.number_BGA_QFP || ""} // Sinkronisasi dengan formData
                                                        onChange={handleChange}
                                                        sx={{ flex: '1 1 calc(50% - 8px)' }}
                                                    />
                                                    <TextField
                                                        name="throught_hole"
                                                        label="Throught Hole"
                                                        size="small"
                                                        value={formData.throught_hole || ""} // Sinkronisasi dengan formData
                                                        onChange={handleChange}
                                                        sx={{ flex: '1 1 calc(50% - 8px)' }}
                                                    />
                                                </Box>
                                            </Grid>
                                        </>
                                    )
                                }
                                if (part.type === 'Dispanel the Boards to Delivery' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                                    Dispanel the Boards to Delivery
                                                </FormLabel>
                                                <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                    {part.data.map((obj, idx) => (
                                                        <FormControlLabel
                                                            name="board_to_delivery"
                                                            key={idx}
                                                            value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                            control={<Radio />}
                                                            label={obj.type}
                                                            onChange={handleChange}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    );
                                }
                                if (part.type === 'Function Test' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                                    Function Tes
                                                </FormLabel>
                                                <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                    {part.data.map((obj, idx) => (
                                                        <FormControlLabel
                                                            name="function_test"
                                                            key={idx}
                                                            value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                            control={<Radio />}
                                                            label={obj.type}
                                                            onChange={handleChange}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    );
                                }

                                if (part.type === 'Cable Wire Harness Assembly' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                                    Cable Wire Harness Assembly
                                                </FormLabel>
                                                <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                    {part.data.map((obj, idx) => (
                                                        <FormControlLabel
                                                            name="cable_wire_harness_assembly"
                                                            key={idx}
                                                            value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                            control={<Radio />}
                                                            label={obj.type}
                                                            onChange={handleChange}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    );
                                }
                            })}
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ fontWeight: 'bold', color: '#333' }}>
                                        Detail Information
                                    </FormLabel>
                                    <TextField
                                        name='detail_information'
                                        multiline
                                        rows={3}
                                        placeholder="Enter detailed information here..."
                                        sx={{ mt: 1 }}
                                        onChange={handleChange}
                                    />
                                </FormControl>
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
                                <Typography>Rp. {totalCost}</Typography>
                            </Box>

                        </Box>

                        <Button type="submit" variant="contained" onClick={handleSubmit} fullWidth sx={{ mb: 2, backgroundColor: '#00A63F', color: '#fff' }}>
                            Simpan Ke Keranjang
                        </Button>
                    </Paper>
                </Box>
            )}
        </form>
    );
};

export default CustomAssembly;

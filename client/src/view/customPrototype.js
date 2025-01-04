import React, { useEffect, useState } from "react";
import {
    Paper,
    Grid,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    ToggleButtonGroup,
    ToggleButton,
    Divider,
    TextField,
    Alert,
    IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import getPartCostomPrototype from '../api/costomPrototypePartApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Toast from "../utils/Toast";
import axios from "axios";

const CustomPrototype = (part) => {
    const [partList, setPartList] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [selectedSubtype, setSelectedSubtype] = useState("");
    const [selectedBoardType, setSelectedBoardType] = useState("");
    const [selectedLayer, setSelectedLayer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({

        board_type: '',
        x_out: '',
        panel_Requirement: '',
        notes: '',
        route_process: '',
        design_in_panel: '',
        width: '',
        length: '',
        quantity: '',
        layer: '',
        copper_layer: '',
        solder_mask_position: '',
        silkscreen_position: '',
        material: '',
        material_option: '',
        thickness: '',
        min_track: '',
        min_hole: '',
        solder_mask: '',
        silkscreen: '',
        uv_printing: '',
        edge_conector: '',
        surface_finish: '',
        via_process: '',
        finish_copper: '',
        inner_copper: '',
        design_file: '',
        total_cost: 0,

    });

    console.log(formData)

    const [getCost, setGetCost] = useState({
        board_type: 0,
        x_out: 0,
        panel_Requirement: 0,
        notes: 0,
        route_process: 0,
        design_in_panel: 0,
        width: 0,
        length: 0,
        quantity: 0,
        layer: 0,
        copper_layer: 0,
        solder_mask_position: 0,
        silkscreen_position: 0,
        material: 0,
        thickness: 0,
        min_track: 0,
        min_hole: 0,
        solder_mask: 0,
        silkscreen: 0,
        uv_printing: 0,
        edge_conector: 0,
        surface_finish: 0,
        via_process: 0,
        finish_copper: 0,
        remove_product_no: 0,
        design_file: 0,
    })
    const [totalCost, setTotalCost] = useState(0);

    // tambahan menu berdasarkan jenis board  
    useEffect(() => {
        if (formData.board_type) {
            setSelectedBoardType(formData.board_type);
        }
        if (formData.material) {
            setSelectedMaterial(formData.material)
        }
        if (formData.layer) {
            setSelectedLayer(formData.layer)
        }
        
    }, [formData.board_type, formData.material, formData.layer]);


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

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPartCustomPrototype = async () => {
            try {
                const rawData = await getPartCostomPrototype();
                const formattedData = rawData.map((product) => ({
                    id: product._id,
                    type: product.type,
                    data: product.data.map((dataItem) => ({
                        id: dataItem._id,
                        type: dataItem.type,
                        cost: dataItem.cost,
                        value: dataItem.value,
                        subtype: dataItem.subtype
                    })),
                }));
                setPartList(formattedData);
            } catch (error) {
                console.error("Failed to load parts data:", error);
            }
        };

        fetchPartCustomPrototype();
    }, []);


    const handleBack = () => {
        navigate("/custom");
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validasi Input
        const requiredFields = [
            'board_type', 'x_out', 'panel_Requirement', 'notes', 'route_process',
            'design_in_panel', 'width', 'length', 'quantity', 'layer', 'copper_layer',
            'solder_mask_position', 'silkscreen_position', 'material', 'thickness',
            'min_track', 'min_hole', 'solder_mask', 'silkscreen', 'uv_printing',
            'edge_conector', 'surface_finish', 'finish_copper', 'remove_product_no'
        ];

        try {
            const token = localStorage.getItem('token');

            if (!token) {
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
                'http://localhost:5000/costom-prototype/request-costom',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
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
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 2, p: 2, bgcolor: "#E6F0FF", alignItems: "flex-start" }}>
                {/* Left Panel */}
                {partList && (

                    <Paper sx={{ flex: 2, p: 2 }}>
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
                                        Custom Prototype
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Custom Prototype Specification
                        </Typography>
                        <Grid container spacing={2}>
                            {partList?.map((part, index) => {
                                if (part.type === 'Board Type' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12} key={index}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Board Type
                                            </Typography>
                                            <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                {part.data.map((obj, idx) => (
                                                    <FormControlLabel
                                                        key={idx}
                                                        label={obj.type}
                                                        control={
                                                            <Radio
                                                                name="board_type"
                                                                key={idx}
                                                                value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                label={obj.type}
                                                                onChange={handleChange}
                                                            />
                                                        }
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </Grid>
                                    );
                                }

                                if (selectedBoardType === 'panel by customer' && part.type === 'X Out') {
                                    return (
                                        <Grid item xs={12} key={index}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                X Out Allowance in Panel
                                            </Typography>
                                            <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                {part.data.map((obj, idx) => (
                                                    <FormControlLabel
                                                        key={idx}
                                                        label={obj.type}
                                                        control={
                                                            <Radio
                                                                name="x_out"
                                                                key={idx}
                                                                value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                label={obj.type}
                                                                onChange={handleChange}
                                                            />
                                                        }
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </Grid>

                                    );
                                }

                                if (selectedBoardType === 'panel by polibatam' && part.type === 'Panel Requirement') {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item xs={12}>
                                                <Box display="flex" flexDirection="column" gap={2}>
                                                    <Box display="flex" alignItems="center" gap={2}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            Panel Requirement: Break-away rail? :
                                                        </Typography>
                                                        <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                            {part.data.map((obj, idx) => (
                                                                <FormControlLabel
                                                                    name="panel_Requirement"
                                                                    key={idx}
                                                                    value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                    control={<Radio />}
                                                                    label={obj.type}
                                                                    onChange={handleChange}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </Box>
                                                    <TextField
                                                        name="notes"
                                                        label="e.g. Panel in 2*3, size of the break-away rail, total 5 panels = total 30 individual boards"
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={2}
                                                        onChange={handleChange}
                                                    />
                                                </Box>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }

                                if (selectedBoardType === 'panel by polibatam' && part.type === 'Route Process') {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent="space-between" gap={2} alignItems="flex-start">
                                                    {/* Route Process */}
                                                    <Box flex={1}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            Route Process
                                                        </Typography>
                                                        <FormControl fullWidth variant="outlined">
                                                            <InputLabel>Route Process</InputLabel>
                                                            <Select
                                                                name="route_process"
                                                                value={JSON.stringify(formData.route_process.type)}
                                                                label="Route Process"
                                                                onChange={handleChange}
                                                            >
                                                                {part.data.map((obj, idx) => (
                                                                    <MenuItem key={idx} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                        {obj.type}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    {/* X Out Allowance */}
                                                    <Box flex={1}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            X Out Allowance in Panel
                                                        </Typography>
                                                        <RadioGroup row defaultValue="0">
                                                            {partList
                                                                .find(p => p.type === "X Out")
                                                                .data.map((obj, idx) => (
                                                                    <FormControlLabel
                                                                        name="x_out"
                                                                        key={idx}
                                                                        value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                        control={<Radio />}
                                                                        label={obj.type}
                                                                        onChange={handleChange}
                                                                    />
                                                                ))}
                                                        </RadioGroup>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }


                                if (part.type === 'Different Design In Panel' && part.data.length > 0) {
                                    return (
                                        <Grid item xs={12} key={index}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Different Designs in Panel
                                            </Typography>
                                            <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                {part.data.map((obj) => (
                                                    <FormControlLabel
                                                        name="design_in_panel"
                                                        key={obj.type}
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
                                if (part.type === 'Dimensions' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12} key={part.type}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Size (single)
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel id="length-label">Length</InputLabel>
                                                        <Select
                                                            name="length"
                                                            labelId="length-label"
                                                            defaultValue={part.data.find((obj) => obj.type === "length")?.cost || ""}
                                                            label="Length"
                                                            value={JSON.stringify(formData.length.type)}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="" disabled>
                                                                Select Length
                                                            </MenuItem>
                                                            {part.data

                                                                .map((obj) => (
                                                                    <MenuItem key={obj.idx || obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                        {obj.type}
                                                                    </MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel id="width-label">Width</InputLabel>
                                                        <Select
                                                            name="width"
                                                            labelId="width-label"
                                                            defaultValue={part.data.find((obj) => obj.type === "width")?.cost || ""}
                                                            label="Width"
                                                            value={JSON.stringify(formData.width.type)}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="" disabled>
                                                                Select Width
                                                            </MenuItem>
                                                            {part.data
                                                                .map((obj) => (
                                                                    <MenuItem key={obj.value} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                        {obj.type}
                                                                    </MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    );
                                }
                                if (part.type === 'Quantity' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Quantity (Pcs)
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Quantity</InputLabel>
                                                <Select
                                                    name="quantity"
                                                    defaultValue=""
                                                    value={JSON.stringify(formData.quantity.type)}
                                                    label="Select Quantity"
                                                    onChange={handleChange}
                                                >
                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Layer Type' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Layers
                                            </Typography>
                                            <RadioGroup

                                                row
                                                name="layer"
                                                value={JSON.stringify(formData.quantity.type)}
                                                    label="Select Quantity"
                                                    onChange={handleChange}
                                            >
                                                {part.data.map((obj) => (
                                                    <FormControlLabel
                                                        key={obj.type}
                                                        value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                        control={<Radio />}
                                                        label={obj.type}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </Grid>
                                    );
                                }

                                // Kondisi pertama untuk "Copper Layer"
                                if (selectedLayer === '1 Layer' && part.type === 'Copper Layer') {
                                    return (
                                        <React.Fragment key="copper-layer">
                                            <Grid container item xs={12} spacing={2}>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel>Copper Layer</InputLabel>
                                                        <Select
                                                            name="copper_layer"
                                                            defaultValue=""
                                                            value={JSON.stringify(formData.copper_layer.type)}
                                                            label="Copper Layer"
                                                            onChange={handleChange}
                                                        >
                                                            {part.data.map((obj) => (
                                                                <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                    {obj.type}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }

                                // Kondisi kedua untuk "Solder Mask Position"
                                if (selectedLayer === '1 Layer' && part.type === 'Solder Mask Position') {
                                    return (
                                        <React.Fragment key="solder-mask-position">
                                            <Grid container item xs={12} spacing={2}>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel>Solder Mask Position</InputLabel>
                                                        <Select
                                                            name="solder_mask_position"
                                                            defaultValue=""
                                                            value={JSON.stringify(formData.solder_mask_position.type)}
                                                            label="Solder Mask Position"
                                                            onChange={handleChange}
                                                        >
                                                            {part.data.map((obj) => (
                                                                <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                    {obj.type}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }

                                // Kondisi ketiga untuk "Silkscreen Position"
                                if (selectedLayer === '1 Layer' && part.type === 'Silkscreen Position') {
                                    return (
                                        <React.Fragment key="silkscreen-position">
                                            <Grid container item xs={12} spacing={2}>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel>Silkscreen Position</InputLabel>
                                                        <Select
                                                            name="silkscreen_position"
                                                            defaultValue=""
                                                            value={JSON.stringify(formData.solder_mask_position.type)}
                                                            label="Silkscreen Position"
                                                            onChange={handleChange}
                                                        >
                                                            {part.data.map((obj) => (
                                                                <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                    {obj.type}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }

                                if (part.type === 'Material' && part.data?.length > 0) {
                                    return (
                                        <React.Fragment key={`material-${index}`}>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent="space-between" gap={2} alignItems="flex-start">
                                                    {/* Material */}
                                                    <Box flex={1}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            Material
                                                        </Typography>
                                                        <FormControl fullWidth variant="outlined">
                                                            <InputLabel>Select Material</InputLabel>
                                                            <Select
                                                                name="material"
                                                                value={JSON.stringify(formData.material.type)}
                                                                onChange={handleChange}
                                                                label="Select Material"
                                                            >
                                                                {part.data.map((obj, idx) => (
                                                                    <MenuItem key={idx} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                                        {obj.type}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    {/* Material Options */}
                                                    <Box flex={1}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                             Options
                                                        </Typography>
                                                        <FormControl fullWidth variant="outlined">
                                                            <InputLabel>Select Option</InputLabel>
                                                            <Select
                                                                name="material_option"
                                                                value={formData.material_option.type}
                                                                onChange={handleChange}
                                                                label="Select Option"
                                                            >
                                                                {partList
                                                                    .find(p => p.type === selectedMaterial)
                                                                    ?.data.map((obj, idx) => (
                                                                        <MenuItem
                                                                            key={idx}
                                                                            value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                                        >
                                                                            {obj.type}
                                                                        </MenuItem>
                                                                    ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }

                                if (part.type === 'Thickness' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Thickness (mm)
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Thickness</InputLabel>
                                                <Select
                                                    name="thickness"
                                                    defaultValue=""
                                                    value={JSON.stringify(formData.thickness.type)}
                                                    label="Select Thickness"
                                                    onChange={handleChange}
                                                >

                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Min Track' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Min Track/Spacing (mil)
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Spacing</InputLabel>
                                                <Select
                                                    name="min_track"
                                                    defaultValue=""
                                                    value={JSON.stringify(formData.min_track.type)}
                                                    label="Select Spacing"
                                                    onChange={handleChange}
                                                >

                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Hole' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Min Hole Size (mm)
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Hole Size</InputLabel>
                                                <Select
                                                    name="min_hole"
                                                    defaultValue=""
                                                    value={JSON.stringify(formData.min_hole.type)}
                                                    label="Select Hole Size"
                                                    onChange={handleChange}
                                                >
                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }

                                if (part.type === 'Solder Mask' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Solder Mask
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Mask</InputLabel>
                                                <Select
                                                    name="solder_mask"
                                                    defaultValue=""
                                                    label="Select Mask"
                                                    value={JSON.stringify(formData.solder_mask.type)}
                                                    onChange={handleChange}
                                                >
                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Silkscreen') {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Silkscreen
                                            </Typography>
                                            <RadioGroup
                                                name="silkscreen"
                                                row
                                                defaultValue=''
                                                onChange={handleChange}
                                            >

                                                {part.data.map((obj) => (
                                                    <FormControlLabel
                                                        value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                        control={<Radio />}
                                                        label={obj.type}
                                                    />
                                                ))}

                                            </RadioGroup>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'UV Printing Multi Color') {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                UV Printing Multi Color
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select UV Printing Multi Color</InputLabel>
                                                <Select
                                                    name="uv_printing"
                                                    defaultValue=""
                                                    value={JSON.stringify(formData.uv_printing.type)}
                                                    label="Select UV Printing Multi Color"
                                                    onChange={handleChange}
                                                >
                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Edge Contector' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Edge Contector
                                            </Typography>
                                            <RadioGroup
                                                name="edge_conector"
                                                row
                                                defaultValue=''
                                                onChange={handleChange}
                                            >
                                                {part.data.map((obj) => (
                                                    <FormControlLabel
                                                        value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                        control={<Radio />}
                                                        label={obj.type}
                                                    />
                                                ))}

                                            </RadioGroup>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Surface Finish' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Surface Finish
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Surface Finish</InputLabel>
                                                <Select
                                                    name="surface_finish"
                                                    defaultValue=""
                                                    label="Select Surface Finish"
                                                    value={JSON.stringify(formData.surface_finish.type)}
                                                    onChange={handleChange}
                                                >
                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Via Process' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Via Process
                                            </Typography>
                                            <RadioGroup
                                                name="via_process"
                                                row
                                                defaultValue=''
                                                onChange={handleChange}
                                            >
                                                {part.data.map((obj) => (
                                                    <FormControlLabel
                                                        value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                        control={<Radio />}
                                                        label={obj.type}
                                                    />

                                                ))}

                                            </RadioGroup>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Finished Copper' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Finished Copper
                                            </Typography>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Select Finished Copper</InputLabel>
                                                <Select
                                                    name="finish_copper"
                                                    defaultValue=""
                                                    label="Select Finished Copper"
                                                    value={JSON.stringify(formData.finish_copper.type)}
                                                    onChange={handleChange}
                                                >
                                                    {part.data.map((obj) => (
                                                        <MenuItem key={obj.type} value={JSON.stringify({ type: obj.type, cost: obj.cost })}>
                                                            {obj.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                                if (part.type === 'Inner Copper' && part.data?.length > 0) {
                                    return (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Inner Copper
                                            </Typography>
                                            <RadioGroup
                                                name="inner_copper"
                                                row
                                                defaultValue=''
                                                onChange={handleChange}
                                            >
                                                {part.data.map((obj) => (
                                                    <FormControlLabel
                                                        value={JSON.stringify({ type: obj.type, cost: obj.cost })}
                                                        control={<Radio />}
                                                        label={obj.type}
                                                    />

                                                ))}

                                            </RadioGroup>
                                        </Grid>
                                    )
                                }
                                return null;
                            })}
                        </Grid>
                    </Paper>
                )}
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
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography>Total:</Typography>
                            <Typography>Rp. {totalCost}</Typography>
                        </Box>
                    </Box>

                    <Button type="submit" variant="contained" onClick={handleSubmit} fullWidth sx={{ mb: 2, backgroundColor: '#00A63F', color: '#fff' }}>
                        Simpan Ke Keranjang
                    </Button>
                </Paper>
            </Box>
        </form>
    );
};

export default CustomPrototype;

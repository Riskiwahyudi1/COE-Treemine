import React, {useEffect, useState} from "react";
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
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import getPartCostomPrototype from '../api/costomPrototypePartApi';
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
    const [totalCost, setTotalCost] = useState(0)
    const [formData, setFormData] = useState({
        
        name: 'Costom Prototype',
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
        remove_product_no: '',
        design_file: '',
        status: 'Waiting Request',
        shiping_cost: '35000',
        total_cost: '150000',
       
    });


    console.log(formData)
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

    const handleBoardTypeChange = (event, newBoardType) => {
        if (newBoardType) {
            setSelectedBoardType(newBoardType);
        }
    };

    const handleLayyerChange = (event) => {
        setSelectedLayer(event.target.value); 
    };
    const handleMaterialChange = (event) => {
        setSelectedMaterial(event.target.value);
        setSelectedSubtype(""); 
    }

    const handleBack = () => {
        navigate("/custom");
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

           // Set cost baru untuk setiap perubahan
        let newCost = 0;

        // Mencari biaya berdasarkan tipe yang dipilih
        partList.forEach((obj) => {
            const selectedItem = obj.data.find((item) => item.type === value); // Menyesuaikan value dengan tipe item

            // Jika item ditemukan, ambil biaya baru
            if (selectedItem) {
                newCost = selectedItem.cost; // ambil cost yang baru
            }
        });

        // Update total cost dengan menambahkan biaya baru
        calculateTotalCost();
    };

    // Fungsi untuk menghitung total cost berdasarkan semua pilihan yang dipilih
    const calculateTotalCost = () => {
        let allSelectedCosts = 0;

        // Menjumlahkan semua biaya berdasarkan pilihan yang ada
        Object.keys(formData).forEach((key) => {
            const selectedItem = partList.find((obj) => obj.type === formData[key]);
            const selectedData = selectedItem?.data.find((item) => item.type === formData[key]);
            allSelectedCosts += selectedData ? selectedData.cost : 0;
        });

        // Update state total cost
        setTotalCost(allSelectedCosts);
        }
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
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Button
                        variant="contained"
                        onClick={handleBack}
                        sx={{
                            bgcolor: '#54cbbb',
                            color: '#FFFFFF',
                            borderRadius: 1,
                            '&:hover': { bgcolor: '#3da38f' },
                        }}
                    >
                        Back
                    </Button>
                    <Typography
                        variant="h6"
                        sx={{
                            bgcolor: '#54cbbb',
                            color: '#FFFFFF',
                            p: 1,
                            borderRadius: 1,
                            display: 'inline-block',
                        }}
                    >
                        Custom Assembly
                    </Typography>
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
                                <ToggleButtonGroup
                                    exclusive
                                    fullWidth
                                    value={selectedBoardType}
                                    onChange={handleBoardTypeChange}
                                    aria-label="Board type"
                                    sx={{ display: 'flex', gap: 1 }}
                                >
                                    {part.data.map((typeObj, idx) => (
                                        <ToggleButton key={idx} value={typeObj.type}>
                                            {typeObj.type}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
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
                                            name="x_out"
                                            key={idx}
                                            value={obj.type}
                                            control={<Radio />}
                                            label={obj.type}
                                            onChange={handleChange}
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
                                                        value={obj.type}
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
                                                    value={formData.route_process} 
                                                    label="Route Process"
                                                    onChange={handleChange} 
                                                >
                                                    {part.data.map((obj, idx) => (
                                                        <MenuItem key={idx} value={obj.type}>
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
                                                            value={obj.type}
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

                               
                    if (part.type === 'Different Design In Panel'  && part.data.length > 0) {
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
                                            value={obj.type}
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
                                                    value={formData.length}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select Length
                                                    </MenuItem>
                                                    {part.data
                                                        
                                                        .map((obj) => (
                                                            <MenuItem key={obj.idx || obj.type} value={obj.type}>
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
                                                    value={formData.width}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select Width
                                                    </MenuItem>
                                                    {part.data
                                                        .map((obj) => (
                                                            <MenuItem key={ obj.value} value={obj.type}>
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
                    if(part.type === 'Quantity' && part.data?.length > 0){
                        return(
                            <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Quantity (Pcs)
                            </Typography>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Select Quantity</InputLabel>
                                <Select 
                                    name="quantity"
                                    defaultValue="" 
                                    value={formData.quantity}
                                    label="Select Quantity"
                                    onChange={handleChange}
                                    >
                                    {part.data.map((obj) => (
                                        <MenuItem key={obj.type} value={obj.type}>
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
                                    value={selectedLayer} 
                                    onChange={ handleLayyerChange } 
                                >
                                    {part.data.map((obj) => (
                                        <FormControlLabel 
                                            key={obj.type}
                                            value={obj.type}
                                            control={<Radio />} 
                                            label={obj.type} 
                                        />
                                    ))}
                                </RadioGroup>
                            </Grid>
                        );
                    }
                    
                   // Kondisi pertama untuk "Copper Layer"
                    if (selectedLayer === '1 Layer' &&  part.type === 'Copper Layer') {
                        return (
                            <React.Fragment key="copper-layer">
                                <Grid container item xs={12} spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Copper Layer</InputLabel>
                                            <Select 
                                                name="copper_layer"
                                                defaultValue="" 
                                                value={formData.copper_layer}
                                                label="Copper Layer"
                                                onChange={handleChange}
                                                >
                                                {part.data.map((obj) => (
                                                    <MenuItem key={obj.type} value={obj.type}>
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
                    if (selectedLayer === '1 Layer' &&  part.type === 'Solder Mask Position') {
                        return (
                            <React.Fragment key="solder-mask-position">
                                <Grid container item xs={12} spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Solder Mask Position</InputLabel>
                                            <Select 
                                                name="solder_mask_position"
                                                defaultValue="" 
                                                value={formData.solder_mask_position}
                                                label="Solder Mask Position"
                                                onChange={handleChange}
                                                >
                                                {part.data.map((obj) => (
                                                    <MenuItem key={obj.type} value={obj.type}>
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
                    if (selectedLayer === '1 Layer' &&  part.type === 'Silkscreen Position') {
                        console.log(selectedLayer)
                        return (
                            <React.Fragment key="silkscreen-position">
                                <Grid container item xs={12} spacing={2}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Silkscreen Position</InputLabel>
                                            <Select 
                                                name="silkscreen_position"
                                                defaultValue="" 
                                                value={formData.silkscreen_position}
                                                label="Silkscreen Position"
                                                onChange={handleChange}
                                                >
                                                {part.data.map((obj) => (
                                                    <MenuItem key={obj.type} value={obj.type}>
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

                    if (part.type === "Material" && part.data?.length > 0) {
                        return (
                            <Grid item xs={12} key={`material-${index}`}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Material
                                </Typography>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Select Material</InputLabel>
                                    <Select
                                        value={selectedMaterial}
                                        onChange={handleMaterialChange}
                                        label="Select Material"
                                    >
                                        {part.data
                                            .map((obj) => obj.type)
                                            .filter((value, idx, self) => self.indexOf(value) === idx)
                                            .map((type, idx) => (
                                                <MenuItem key={idx} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        );
                    }

                    // Check if material is selected and filter subtype
                    if (selectedMaterial) {
                        const uniqueSubtypes = part.data.filter(
                            (obj) => obj.type === selectedMaterial
                        );

                        // Debugging log
                        console.log("Selected Material:", selectedMaterial);
                        console.log("Unique Subtypes:", uniqueSubtypes);

                        if (uniqueSubtypes.length > 0) {
                            return (
                                <Grid item xs={12} key={`subtype-${index}`}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {selectedMaterial} Options
                                    </Typography>
                                    <RadioGroup
                                        value={selectedSubtype}
                                        onChange={(e) => setSelectedSubtype(e.target.value)}
                                        row
                                    >
                                        {uniqueSubtypes.map((obj, idx) => (
                                            <FormControlLabel
                                                key={idx}
                                                value={obj.subtype}
                                                control={<Radio />}
                                                label={`${obj.subtype} (Cost: ${obj.cost})`}
                                            />
                                        ))}
                                    </RadioGroup>
                                </Grid>
                            );
                        }
                    }

                    if(part.type === 'Thickness' && part.data?.length > 0){
                        return(
                            <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Thickness (mm)
                            </Typography>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Select Thickness</InputLabel>
                                <Select 
                                    name="thickness"
                                    defaultValue="" 
                                    value={formData.thickness}
                                    label="Select Thickness"
                                    onChange={handleChange}
                                    >

                                    {part.data.map((obj) => (
                                        <MenuItem key={obj.type} value={obj.type}>
                                            {obj.type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        )
                    }
                    if(part.type === 'Min Track' && part.data?.length > 0){
                        return(
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Min Track/Spacing (mil)
                                </Typography>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Select Spacing</InputLabel>
                                    <Select 
                                        name="min_track"
                                        defaultValue=""
                                        value={formData.min_track} 
                                        label="Select Spacing"
                                        onChange={handleChange}
                                        >

                                        {part.data.map((obj) => (
                                            <MenuItem key={obj.type} value={obj.type}>
                                                {obj.type} 
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }
                    if(part.type === 'Hole' && part.data?.length > 0){
                        return(
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Min Hole Size (mm)
                                </Typography>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Select Hole Size</InputLabel>
                                    <Select 
                                        name="min_hole"
                                        defaultValue="" 
                                        value={formData.min_hole}
                                        label="Select Hole Size"
                                        onChange={handleChange}
                                        >
                                        {part.data.map((obj) => (
                                            <MenuItem key={obj.type} value={obj.type}>
                                                {obj.type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }

                    if(part.type === 'Solder Mask' && part.data?.length > 0){
                        return(
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
                                        value={formData.solder_mask}
                                        onChange={handleChange}
                                        >
                                    {part.data.map((obj) => (
                                                <MenuItem key={obj.type} value={obj.type}>
                                                    {obj.type}
                                                </MenuItem>
                                            ))}
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }
                    if(part.type === 'Silkscreen'){
                        return(
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
                                            value={obj.type}
                                            control={<Radio />}
                                            label={obj.type}
                                        />
                                    ))}
                                    
                                </RadioGroup>
                            </Grid>
                        )
                    }
                    if(part.type === 'UV Printing Multi Color'){
                        return(
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                UV Printing Multi Color
                                </Typography>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Select UV Printing Multi Color</InputLabel>
                                    <Select 
                                        name="uv_printing"
                                        defaultValue="" 
                                        value={formData.uv_printing}
                                        label="Select UV Printing Multi Color"
                                        onChange={handleChange}
                                        >
                                    {part.data.map((obj) => (
                                                <MenuItem key={obj.type} value={obj.type}>
                                                    {obj.type}
                                                </MenuItem>
                                            ))}
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }
                    if(part.type === 'Edge Contector' && part.data?.length > 0){
                        return(
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
                                            value={obj.type}
                                            control={<Radio />}
                                            label={obj.type}
                                        />
                                    ))}
                                    
                                </RadioGroup>
                            </Grid>
                        )
                    }
                    if(part.type === 'Surface Finish' && part.data?.length > 0){
                        return(
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
                                        value={formData.surface_finish}
                                        onChange={handleChange}
                                        >
                                        {part.data.map((obj) => (
                                            <MenuItem key={obj.type} value={obj.type}>
                                                {obj.type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }
                    if(part.type === 'Via Process' && part.data?.length > 0){
                        return(
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
                                            value={obj.type}
                                            control={<Radio />}
                                            label={obj.type}
                                        />

                                    ))}
                                    
                                </RadioGroup>
                            </Grid>
                        )
                    }
                    if(part.type === 'Finished Copper' && part.data?.length > 0){
                        return(
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
                                        value={formData.finish_copper}
                                        onChange={handleChange}
                                        >
                                        {part.data.map((obj) => (
                                            <MenuItem key={obj.type} value={obj.type}>
                                                {obj.type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )
                    }
                    if(part.type === 'Remove Product No' && part.data?.length > 0){
                        return(
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Remove Product No
                                </Typography>
                                <RadioGroup 
                                    name="remove_product_no"
                                    row 
                                    defaultValue=''
                                    onChange={handleChange}
                                    >
                                    {part.data.map((obj) => (
                                        <FormControlLabel
                                            value={obj.type}
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
                    Pricing and Build Time
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>PCB Cost:</Typography>
                        <Typography>Rp. {totalCost}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Shipping:</Typography>
                        <Typography>Rp. 0</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Total:</Typography>
                        <Typography>Rp. {totalCost}</Typography>
                    </Box>
                </Box>

                <Button type="submit" variant="outlined" onClick={handleSubmit} fullWidth sx={{ mb: 2 }}>
                    Save To Cart
                </Button>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: "#F87171",
                            "&:hover": { bgcolor: "#DC2626" },
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: "#86EFAC",
                            color: "black",
                            "&:hover": { bgcolor: "#4ADE80" },
                        }}
                    >
                        Calculate
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
                
            </Paper>
        </Box>
        </form>
    );
};

export default CustomPrototype;

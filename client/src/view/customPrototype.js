import React from "react";
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
    Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomPrototype = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk handling navigasi
    const handleBack = () => {
        navigate("/custom"); // Navigasi ke halaman custom prototype
    };

    return (
        <Box sx={{ display: "flex", gap: 2, p: 2, bgcolor: "#E6F0FF", alignItems: "flex-start" }}>
            {/* Left Panel */}
            <Paper sx={{ flex: 2, p: 2 }}>

                {/* Header */}
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
                    {/* Board Type */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Board Type
                        </Typography>
                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            aria-label="Board type"
                            sx={{ display: "flex", gap: 1 }}
                        >
                            <ToggleButton value="single_piece">Single Piece</ToggleButton>
                            <ToggleButton value="panel_by_customer">
                                Panel by Customer
                            </ToggleButton>
                            <ToggleButton value="panel_by_polibatam">
                                Panel by Polibatam
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    {/* Different Designs in Panel */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Different Designs in Panel
                        </Typography>
                        <RadioGroup row defaultValue="1">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <FormControlLabel
                                    key={item}
                                    value={String(item)}
                                    control={<Radio />}
                                    label={String(item)}
                                />
                            ))}
                        </RadioGroup>
                    </Grid>

                    {/* Size and Quantity */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Size (single) & Quantity
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Width</InputLabel>
                                    <Select defaultValue="297">
                                        {[100, 150, 200, 297, 400].map((width) => (
                                            <MenuItem key={width} value={width}>
                                                {width} mm
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Height</InputLabel>
                                    <Select defaultValue="21">
                                        {[10, 21, 50, 100, 150].map((height) => (
                                            <MenuItem key={height} value={height}>
                                                {height} mm
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Quantity</InputLabel>
                                    <Select defaultValue="5">
                                        {[1, 5, 10, 20, 50].map((quantity) => (
                                            <MenuItem key={quantity} value={quantity}>
                                                {quantity} pcs
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Layers */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Layers
                        </Typography>
                        <RadioGroup row defaultValue="1_layer">
                            <FormControlLabel value="1_layer" control={<Radio />} label="1" />
                            <FormControlLabel value="2_layer" control={<Radio />} label="2" />
                            <FormControlLabel value="4_layer" control={<Radio />} label="4" />
                        </RadioGroup>
                    </Grid>

                    {/* Coppers */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Coppers Layer
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Layer</InputLabel>
                            <Select defaultValue="top_layer">
                                <MenuItem value="top_layer">Top Layer</MenuItem>
                                <MenuItem value="bottom_layer">Bottom Layer</MenuItem>
                                <MenuItem value="inner_layer">Inner Layer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Material */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Material
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Material</InputLabel>
                            <Select defaultValue="fr-4">
                                <MenuItem value="fr-4">FR-4</MenuItem>
                                <MenuItem value="cem-1">CEM-1</MenuItem>
                                <MenuItem value="aluminum">Aluminum</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* FR4-TG */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            FR4-TG
                        </Typography>
                        <RadioGroup row defaultValue="tg_150_160">
                            <FormControlLabel
                                value="tg_130"
                                control={<Radio />}
                                label="TG 130"
                            />
                            <FormControlLabel
                                value="tg_150_160"
                                control={<Radio />}
                                label="TG 150-160"
                            />
                            <FormControlLabel
                                value="tg_170"
                                control={<Radio />}
                                label="TG 170"
                            />
                        </RadioGroup>
                    </Grid>

                    {/* Thickness */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Thickness (mm)
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Thickness</InputLabel>
                            <Select defaultValue="1.2">
                                {[0.8, 1.2, 1.6, 2.0].map((thickness) => (
                                    <MenuItem key={thickness} value={thickness}>
                                        {thickness} mm
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Min Track/Spacing */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Min Track/Spacing (mil)
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Spacing</InputLabel>
                            <Select defaultValue="10">
                                {[6, 8, 10, 12].map((spacing) => (
                                    <MenuItem key={spacing} value={spacing}>
                                        {spacing} mil
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Min Hole Size */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Min Hole Size (mm)
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Hole Size</InputLabel>
                            <Select defaultValue="0.3">
                                {[0.2, 0.3, 0.4, 0.5].map((holeSize) => (
                                    <MenuItem key={holeSize} value={holeSize}>
                                        {holeSize} mm
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Solder Mask */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Solder Mask
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Solder Mask</InputLabel>
                            <Select defaultValue="green">
                                <MenuItem value="green">Green</MenuItem>
                                <MenuItem value="red">Red</MenuItem>
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="black">Black</MenuItem>
                                <MenuItem value="white">White</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Silkscreen */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Silkscreen
                        </Typography>
                        <RadioGroup row defaultValue="white">
                            <FormControlLabel
                                value="white"
                                control={<Radio />}
                                label="White"
                            />
                            <FormControlLabel
                                value="black"
                                control={<Radio />}
                                label="Black"
                            />
                        </RadioGroup>
                    </Grid>

                    {/* Surface Finish */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Surface Finish
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Surface Finish</InputLabel>
                            <Select defaultValue="immersion_tin">
                                <MenuItem value="immersion_tin">Immersion Tin</MenuItem>
                                <MenuItem value="immersion_gold">Immersion Gold</MenuItem>
                                <MenuItem value="lead_free">Lead Free</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Via Process */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Via Process
                        </Typography>
                        <RadioGroup row defaultValue="tented">
                            <FormControlLabel
                                value="tented"
                                control={<Radio />}
                                label="Tenting Vias"
                            />
                            <FormControlLabel
                                value="plugged"
                                control={<Radio />}
                                label="Plugged with Solder Mask"
                            />
                            <FormControlLabel
                                value="not_covered"
                                control={<Radio />}
                                label="Vias Not Covered"
                            />
                        </RadioGroup>
                    </Grid>

                    {/* Finished Copper */}
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Finished Copper
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Finished Copper</InputLabel>
                            <Select defaultValue="1 oz CU">
                                {["0.5 oz CU", "1 oz CU", "2 oz CU"].map((copper) => (
                                    <MenuItem key={copper} value={copper}>
                                        {copper}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Right Panel */}
            <Paper sx={{ width: "33%", p: 2, alignSelf: "flex-start" }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Pricing and Build Time
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>PCB Cost:</Typography>
                        <Typography>Rp. 210.000</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Shipping:</Typography>
                        <Typography>Rp. 30.000</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Total:</Typography>
                        <Typography>Rp. 240.000</Typography>
                    </Box>
                </Box>

                <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
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
                </Box>
            </Paper>
        </Box>
    );
};

export default CustomPrototype;

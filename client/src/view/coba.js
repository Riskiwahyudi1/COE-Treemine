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
    TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import getPartCostomPrototype from '../api/costomPrototypePartApi';

const CustomPrototype = (part) => {
    const [partList, setPartList] = useState([]);
    const [selectedBoardType, setSelectedBoardType] = useState("");

    const navigate = useNavigate();

    // Fetch parts data on component mount
    useEffect(() => {
        const fetchPartCustomPrototype = async () => {
            try {
                const rawData = await getPartCostomPrototype();
                const formattedData = rawData.map((product) => ({
                    id: product._id,
                    type: product.type,
                    data: product.data.map((dataItem) => ({
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

    // Handle board type selection
    const handleBoardTypeChange = (event, newBoardType) => {
        if (newBoardType) {
            setSelectedBoardType(newBoardType);
        }
    };


    return (
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
                                            key={idx}
                                            value={obj.cost}
                                            control={<Radio />}
                                            label={obj.type}
                                        />
                                    ))}
                                </RadioGroup>
                            </Grid>
                        );
                    }

                    if (selectedBoardType === 'panel by polibatam' && 
                        (part.type === 'Route Process' || part.type === 'Panel Requirement' || part.type === "X Out")) {
                    
                        return (
                            <React.Fragment key={index}>
                                {/* Panel Requirement */}
                                {partList.find(p => p.type === "Panel Requirement")?.data?.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box display="flex" flexDirection="column" gap={2}>
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Typography variant="body2" sx={{ mb: 1 }}>
                                                    Panel Requirement: Break-away rail? :
                                                </Typography>
                                                <RadioGroup row defaultValue={part.data[0]?.cost}>
                                                    {part.data.map((obj, idx) => (
                                                        <FormControlLabel
                                                            key={idx}
                                                            value={obj.cost}
                                                            control={<Radio />}
                                                            label={obj.type}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </Box>
                                            <TextField
                                                label="Additional Notes"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={2}
                                                sx={{ mt: 2 }} 
                                            />
                                        </Box>
                                    </Grid>
                                )}
                    
                                {/* Route Process */}
                                {partList.find(p => p.type === "Route Process")?.data?.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box display="flex" gap={2} alignItems="flex-start">
                                            {/* Route Process */}
                                            <Box flex={1}>
                                                <Typography variant="body2" sx={{ mb: 1 }}>
                                                    Route Process
                                                </Typography>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Route Process</InputLabel>
                                                    <Select defaultValue="" label="Route Process">
                                                        {part.data.map((obj, idx) => (
                                                            <MenuItem key={idx} value={obj.type}>
                                                                {obj.type}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                    
                                            {/* X-out Allowance */}
                                            {partList.find(p => p.type === "X Out")?.data?.length > 0 && (
                                                <Box flex={1}>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        X-out Allowance in Panel
                                                    </Typography>
                                                    <RadioGroup row defaultValue="0">
                                                        {partList
                                                            .find(p => p.type === "X Out")
                                                            .data.map((obj, idx) => (
                                                                <FormControlLabel
                                                                    key={idx}
                                                                    value={obj.cost}
                                                                    control={<Radio />}
                                                                    label={obj.type}
                                                                />
                                                            ))}
                                                    </RadioGroup>
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>
                                )}
                            </React.Fragment>
                        );
                    }
                               
                    return null;
                })}
                </Grid>
            </Paper>
            )}
            {/* Right Panel */}
            
        </Box>
    );
};

export default CustomPrototype;

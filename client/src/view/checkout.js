import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Grid,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentPage = () => {
    const navigate = useNavigate(); // Menggunakan useNavigate

    // Data Dummy
    const [data, setData] = useState({
        recipient: "Chelsea Anayah",
        phone: "+628123456789",
        address:
            "Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29461",
        product: {
            name: "Control Module Without USB Cable",
            price: 400000,
            quantity: 3,
            image: "https://via.placeholder.com/150", // Replace with the actual image URL
        },
        shippingCost: 35000,
    });

    const subtotal = data.product.price * data.product.quantity;
    const total = subtotal + data.shippingCost;

    // Event handler untuk update state saat field diedit
    const handleChange = (field, value) => {
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // Event handler untuk tombol "Back"
    const handleBack = () => {
        navigate(-1); // Navigasi kembali ke halaman sebelumnya
    };

    return (
        <Box
            sx={{
                padding: 4,
                bgcolor: "#f0f0f0", // Background untuk halaman
                minHeight: "100vh", // Untuk memastikan konten memenuhi tinggi layar
            }}
        >
            <Paper
                sx={{
                    padding: 4,
                    maxWidth: "1000px",
                    margin: "40px auto", // Jarak atas dan bawah sebesar 40px
                    bgcolor: "#f9f9f9",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                {/* Header */}
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Checkout
                </Typography>

                {/* Address Section */}
                <Card sx={{ mb: 3, bgcolor: "#e3f2fd" }}>
                    <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                            Destination Address:
                        </Typography>
                        <TextField
                            label="Recipient Name"
                            variant="outlined"
                            fullWidth
                            value={data.recipient}
                            onChange={(e) => handleChange("recipient", e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={data.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={data.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </CardContent>
                </Card>

                {/* Product and Message Section */}
                <Grid container spacing={2} alignItems="flex-start" mb={3}>
                    {/* Product Details */}
                    <Grid item xs={6}>
                        <Box display="flex" gap={2}>
                            <CardMedia
                                component="img"
                                image={data.product.image}
                                alt={data.product.name}
                                sx={{ width: 150, height: 150, borderRadius: 2 }}
                            />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {data.product.name}
                                </Typography>
                                <Typography variant="body2">
                                    Rp. {data.product.price.toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    Qty: {data.product.quantity}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Message Box */}
                    <Grid item xs={6}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            placeholder="Enter additional notes (optional)"
                        />
                    </Grid>
                </Grid>

                {/* Summary Section */}
                <Box mb={3}>
                    <Typography variant="body1">
                        Subtotal ({data.product.quantity} product): Rp.{" "}
                        {subtotal.toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        Shipping Cost: Rp. {data.shippingCost.toLocaleString()}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" mt={1}>
                        Total Payment: Rp. {total.toLocaleString()}
                    </Typography>
                </Box>

                {/* Action Buttons */}
                <Box display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack} // Event handler untuk tombol back
                    >
                        Back
                    </Button>
                    <Button variant="contained" color="#00A63F">
                        Pay Now
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default PaymentPage;

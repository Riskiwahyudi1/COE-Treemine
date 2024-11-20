import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Rating,Paper } from "@mui/material";

export default function ReviewPage() {
    const [reviewData, setReviewData] = useState({
        no: "",
        orderNumber: "",
        rating: 0,
        message: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRatingChange = (event, newValue) => {
        setReviewData((prevData) => ({
            ...prevData,
            rating: newValue,
        }));
    };

    const handleSubmit = () => {
        // Logika untuk mengirim data review
        console.log("Review Data:", reviewData);
        alert("Review berhasil disimpan!");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#ffffff",
                padding: 4,
            }}
        >
            {/* Header */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: "#1B2D3F",
                    marginBottom: 2,
                }}
            >
                Review Pesanan
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: "#757575",
                    marginBottom: 4,
                    textAlign: "center",
                }}
            >
                Berikan penilaian Anda untuk pesanan ini.
            </Typography>

            {/* Form Review */}
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: "800px",
                }}
            >
                <Grid container spacing={3}>
                    {/* Nomor */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nomor"
                            name="no"
                            value={reviewData.no}
                            onChange={handleInputChange}
                            variant="outlined"
                            placeholder="Masukkan nomor"
                        />
                    </Grid>

                    {/* Nomor Order */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nomor Order"
                            name="orderNumber"
                            value={reviewData.orderNumber}
                            onChange={handleInputChange}
                            variant="outlined"
                            placeholder="Masukkan nomor order"
                        />
                    </Grid>

                    {/* Rating */}
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ marginBottom: 1, color: "#1B2D3F" }}>
                            Rating (1-5):
                        </Typography>
                        <Rating
                            name="rating"
                            value={reviewData.rating}
                            onChange={handleRatingChange}
                            size="large"
                        />
                    </Grid>

                    {/* Pesan */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Pesan"
                            name="message"
                            value={reviewData.message}
                            onChange={handleInputChange}
                            variant="outlined"
                            placeholder="Tulis pesan Anda di sini"
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>

                {/* Tombol Aksi */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 4,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#54cbbb",
                            textTransform: "none",
                            color: "#fff",
                        }}
                        onClick={handleSubmit}
                    >
                        Kirim Review
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import Toast from '../utils/Toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
    
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); 
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };

    
    const handleRequestPasswordReset = async () => {
        if (!email) {
            Toast.fire({
                icon: 'error',
                title: 'Email tidak boleh kosong!',
            });
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await axios.post("http://localhost:5000/password/forgot-password", { email });
    
            if (response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Link reset password telah dikirim ke email Anda.',
                });
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                const { errors } = error.response.data;
                if (errors && Array.isArray(errors)) {
                    
                    errors.forEach((err) => {
                        Toast.fire({
                            icon: 'error',
                            title: err.msg,
                        });
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: error.response?.data?.message || "Terjadi kesalahan.",
                    });
                }
            } else {
                
                Toast.fire({
                    icon: 'error',
                    title: error.message || "Terjadi kesalahan.",
                });
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#ffffff",
                minHeight: "100vh",
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
                Lupa Password
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "#757575",
                    marginBottom: 4,
                    textAlign: "center",
                }}
            >
                Masukkan alamat email Anda untuk menerima link reset password.
            </Typography>

            {/* Formulir Reset Password */}
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
                    {/* Input Email */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChange={handleInputChange}
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
                        sx={{ textTransform: "none" }}
                        onClick={() => navigate("/login")}
                    >
                        Kembali ke Login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleRequestPasswordReset}
                        sx={{
                            backgroundColor: "#00A63F",
                            textTransform: "none",
                            color: "#fff",
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                            "Kirim Link Reset Password"
                        )}
                    </Button>
                </Box>
            </Paper>

            {/* Snackbar Feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

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
import Toast from "../utils/Toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangePassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleChangePassword = async () => {
        if (!password || !confirmPassword) {
            Toast.fire({
                icon: "error",
                title: "Semua field harus diisi!",
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.fire({
                icon: "error",
                title: "Password tidak cocok!",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:5000/password/reset-password/${token}`,
                { password }
            );

            if (response.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Password berhasil diubah!",
                });
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                const { errors } = error.response.data;
                if (errors && Array.isArray(errors)) {
                    errors.forEach((err) => {
                        Toast.fire({
                            icon: "error",
                            title: err.msg,
                        });
                    });
                } else {
                    Toast.fire({
                        icon: "error",
                        title: error.response.data?.message || "Terjadi kesalahan.",
                    });
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Terjadi kesalahan.",
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
                position: "relative",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: "#1B2D3F",
                    marginBottom: 2,
                }}
            >
                Ganti Password
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "#757575",
                    marginBottom: 4,
                    textAlign: "center",
                }}
            >
                Masukkan password baru Anda dan konfirmasi untuk mengganti password.
            </Typography>

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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password Baru"
                            variant="outlined"
                            type="password"
                            name="password"
                            placeholder="Masukkan password baru"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Konfirmasi Password"
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            placeholder="Konfirmasi password baru"
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>

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
                        onClick={handleChangePassword}
                        sx={{
                            backgroundColor: "#00A63F",
                            textTransform: "none",
                            color: "#fff",
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                            "Ganti Password"
                        )}
                    </Button>
                </Box>
            </Paper>

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

            {/* Spinner di bawah */}
            {loading && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}

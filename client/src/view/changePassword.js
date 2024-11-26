import React, { useState } from "react";
import { Box, Typography, Button, TextField, Grid, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword() {
    // State untuk mengatur visibility password
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    // Fungsi untuk toggle visibility password
    const handleTogglePassword = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
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
                Demi keamanan akun Anda, harap gunakan password yang kuat dan tidak pernah digunakan sebelumnya.
            </Typography>

            {/* Formulir Ganti Password */}
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
                    {/* Password Lama */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password Lama"
                            type={showPassword.oldPassword ? "text" : "password"}
                            variant="outlined"
                            placeholder="Masukkan password lama Anda"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleTogglePassword("oldPassword")}
                                            edge="end"
                                        >
                                            {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Password Baru */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password Baru"
                            type={showPassword.newPassword ? "text" : "password"}
                            variant="outlined"
                            placeholder="Masukkan password baru Anda"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleTogglePassword("newPassword")}
                                            edge="end"
                                        >
                                            {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Konfirmasi Password Baru */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Konfirmasi Password Baru"
                            type={showPassword.confirmPassword ? "text" : "password"}
                            variant="outlined"
                            placeholder="Masukkan kembali password baru Anda"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleTogglePassword("confirmPassword")}
                                            edge="end"
                                        >
                                            {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                    <Button variant="outlined" sx={{ textTransform: "none" }}>
                        Batal
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#00A63F",
                            textTransform: "none",
                            color: "#fff",
                        }}
                    >
                        Simpan Perubahan
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    Paper,
    IconButton,
    InputAdornment,
    Snackbar,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Toast from '../utils/Toast'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';

export default function ChangePassword() {
    // State untuk mengatur visibility password
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
 const { userToken,logoutUser } = useAuth(); 
    const navigate = useNavigate();

    // State untuk input password
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // State untuk Snackbar feedback
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Fungsi untuk toggle visibility password
    const handleTogglePassword = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Fungsi untuk menyimpan perubahan password
    const handleChangePassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = passwordData;
        

        if (newPassword !== confirmPassword) {
            Toast.fire({
                icon: 'error',
                title: 'Password baru dan konfirmasi password tidak cocok!',
            });
            return;
        }

        try {
            const response = await axios.post(`${apiConfig.baseURL}password/change-password`, {
                oldPassword,
                newPassword,
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if(response.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'Password berhasil di ubah, silahkan login kembali!',
                });
                logoutUser()
            }

            // Reset input fields
            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
          
            if (error.response) {
                
                if (error.response.data.errors) {
                   
                    error.response.data.errors.forEach((err) => {
                        Toast.fire({
                            icon: 'error',
                            title: err.msg || "Gagal mengubah password.",
                        });
                    });
                } else {
                  
                    Toast.fire({
                        icon: 'error',
                        title: error.response?.data?.message || "Gagal mengubah password.",
                    });
                }
            } else if (error.request) {
               
                Toast.fire({
                    icon: 'error',
                    title: "Tidak ada response dari server.",
                });
            } else {
               
                Toast.fire({
                    icon: 'error',
                    title: error.message || "Terjadi kesalahan.",
                });
            }
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
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handleInputChange}
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
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
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
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleInputChange}
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
                        onClick={handleChangePassword}
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

import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Grid,
    Card,
    TextField,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Videocontoh from "../assets/images/logo 2.png";
import { useAuth } from '../contexts/AuthContext';

const LoginFormCard = () => {

    const { loginAdmin } = useAuth(); // Gunakan loginAdmin dari AuthContext
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/admin/login/protected", // Endpoint login admin
                { email, password },
                { withCredentials: true } // Pastikan cookie dikirim
            );

            console.log(response.data)
            if (response.status === 200) {
                const { token } = response.data; // Asumsikan server mengirim token
                loginAdmin(token); // Simpan token di cookies dan set autentikasi admin
                window.location.href = "/admin/dashboard"; // Redirect setelah login sukses
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                padding: 4,
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    maxWidth: 900,
                    borderRadius: 2,
                    boxShadow: "0px 2px 5px rgba(0, 166, 63, 0.5)",
                    overflow: "hidden",
                }}
            >
                {/* Bagian Gambar */}
                <Grid item xs={12} md={6} sx={{ backgroundColor: "#00A63F" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            padding: 3,
                        }}
                    >
                        <img
                            src={Videocontoh}
                            alt="Logo"
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                    </Box>
                </Grid>

                {/* Bagian Form */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            padding: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h5" mb={2} color="#00A63F">
                            Login to Admin
                        </Typography>
                        {error && (
                            <Typography variant="body2" color="error" mb={2}>
                                {error}
                            </Typography>
                        )}
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                sx: {
                                    color: "black",
                                    "&.Mui-focused": { color: "black" },
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00A63F',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00A63F',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00A63F',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{
                                sx: {
                                    color: "black",
                                    "&.Mui-focused": { color: "black" },
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00A63F',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00A63F',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00A63F',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                marginTop: 2,
                                backgroundColor: "#00A63F",
                                "&:hover": { backgroundColor: "#008c36" },
                            }}
                            onClick={handleLogin}
                        >
                            Submit
                        </Button>
                        <Button
                            startIcon={<HomeIcon />}
                            fullWidth
                            sx={{
                                marginTop: 2,
                                color: "#00A63F",
                                border: "1px solid #00A63F",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 166, 63, 0.1)",
                                },
                            }}
                            onClick={() => window.location.href = "/"} // Redirect ke home
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Grid>
            </Card>
        </Box>
    );
};

export default LoginFormCard;

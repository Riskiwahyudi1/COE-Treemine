import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  Link
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import Videocontoh from "../assets/images/logo 2.png";
import Toast from '../utils/Toast';
import apiConfig from '../config/apiConfig';



const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [expiredMessage, setExpiredMessage] = useState('');

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect ke halaman lupa password
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  // Handle submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiConfig.baseURL}login/buyer`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      // Akses token dari lokasi yang benar
      const token = response.data.user.token;

      if (token) {
        loginUser(token);
        Toast.fire({
          icon: 'success',
          title: 'Login successful',
        });
        navigate('/', { state: { showToast: true } });
      } else {
        setError('Failed to login. No token received.');
      }
    } catch (error) {
      
      if (error.response) {
        const { errors } = error.response.data;
        if (errors && Array.isArray(errors)) {
          const errorMessage = errors.map((err) => err.msg).join(' | ');
          setError(errorMessage);
        } else {
          setError(error.response.data?.message || 'Terjadi kesalahan.');
        }
      } else {
        setError('Terjadi kesalahan.');
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const authUserMessage = getCookie('authUserMessage');
    if (authUserMessage) {
      setExpiredMessage(authUserMessage);
      removeCookie('authUserMessage');
    }
  }, []);

  return (
    <Grid container component="main" sx={{ height: '100vh', borderRadius: '50%' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: '#00A63F',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0 100%)'
        }}
      >
        <Box
          component="img"
          src={Videocontoh}
          alt="E-commerce Web Page"
          sx={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            marginRight: '100px',
          }}
        />
      </Grid>
      <Grid
        item xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          clipPath: 'polygon(15% 0, 100% 0%, 100% 100%, 0% 100%)',
          overflow: 'hidden'
        }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            See what's happening in the Seotech world right now
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
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
            {expiredMessage && (
              <Alert severity="error">{expiredMessage}</Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#00A63F',
                '&:hover': { bgcolor: '#00A65F' }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                color: 'blue',
                textDecoration: 'none',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
              }}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                startIcon={<HomeIcon />}
                sx={{
                  width: '48%',
                  color: '#00A63F',
                  borderColor: '#00A63F',
                  '&:hover': {
                    bgcolor: '#00A63F',
                    color: '#fff',
                  }
                }}
              >
                Home
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/register')}
                sx={{
                  width: '48%',
                  color: '#00A63F',
                  borderColor: '#00A63F',
                  '&:hover': {
                    bgcolor: '#00A63F',
                    color: '#fff', // Ensure text is visible on hover
                  }
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

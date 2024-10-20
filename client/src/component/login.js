import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Grid, 
    CircularProgress, 
    Alert, 
    Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';  // Import sesuai perubahan
import Videocontoh from '../assets/images/Tablet login.gif';

// Setup Toast untuk notifikasi
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Menggunakan hook useAuth
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const response = await axios.post('http://localhost:5000/login/buyer', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.token) {
        console.log('Token:', response.data.token); // Debug log
        localStorage.setItem('token', response.data.token); // Simpan token ke localStorage
        login(); // Update status autentikasi
        Toast.fire({
          icon: 'success',
          title: 'Login successful',
        });
        navigate('/', { state: { showToast: true } });
      } else {
        setError('Failed to login. No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: '#B4D2ED',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
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
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
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
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#d565be',
                '&:hover': { bgcolor: '#b054a5' } // Darker shade for hover
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{
                  width: '48%',
                  color: '#84C9EF',
                  borderColor: '#84C9EF',
                  '&:hover': {
                    bgcolor: '#84C9EF',
                    color: '#fff', // Ensure text is visible on hover
                  }
                }}
              >
                Back to Home
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/register')}
                sx={{
                  width: '48%',
                  color: '#d565be',
                  borderColor: '#d565be',
                  '&:hover': {
                    bgcolor: '#d565be',
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

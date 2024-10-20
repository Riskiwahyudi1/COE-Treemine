import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, CircularProgress, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Videocontoh from '../assets/images/Sign up.gif';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChage = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message before submitting
    try {
      const response = await axios.post('http://localhost:5000/register/buyer', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Register successful', response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Registration successful!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate('/login');
        });
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with a status code
        setError(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
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
            Register
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Join the Seotech world today
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            noValidate 
            sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.value}
              onChange={handleChage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.value}
              onChange={handleChage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.value}
              onChange={handleChage}
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
                '&:hover': {
                  bgcolor: '#b054a5', 
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>


            {/* Flexbox container for the buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2, // Adding some space between buttons
                mt: 2,
                width: '100%',
              }}
            >
              {/* Button to go back to the Home Page */}
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{
                  flex: 1, // Each button takes equal space
                  borderColor: '#84C9EF', // Border color
                  color: '#84C9EF', // Text color
                  '&:hover': {
                    backgroundColor: '#84C9EF', // Background color on hover
                    color: '#fff', // Text color on hover
                  }
                }}
              >
                Back to Home
              </Button>


              {/* Button to go back to the Login Page */}
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  flex: 1, // Each button takes equal space
                  borderColor: '#d565be', // Border color
                  color: '#d565be', // Text color
                  '&:hover': {
                    backgroundColor: '#d565be', // Background color on hover
                    color: '#fff', // Text color on hover
                  }
                }}
              >
                Back to Login
              </Button>

            </Box>
          </Box>
        </Box>
      </Grid>
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
    </Grid>
  );
};

export default RegisterPage;

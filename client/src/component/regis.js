import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, CircularProgress, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Videocontoh from '../assets/images/Mobile login.gif';
import Toast from '../utils/Toast';

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
    setError(''); 
    try {
      const response = await axios.post('http://localhost:5000/register/buyer', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Register successful', response.data);
        Toast.fire({
          icon: 'success',
          title: 'Register successful',
        });
        navigate('/', { state: { showToast: true } });
          navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('No response from the server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
      sx={{
        clipPath: 'polygon(0 0, 100% 0%, 85% 100%, 0% 100%)',
        overflow: 'hidden',
    }}
      >
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
                bgcolor: '#54CBBB',
                '&:hover': {
                  bgcolor: '#2f98cd', 
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
                  borderColor: '#2f98cd', // Border color
                  color: '#2f98cd', // Text color
                  '&:hover': {
                    backgroundColor: '#2f98cd', // Background color on hover
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
                  borderColor: '#54CBBB', // Border color
                  color: '#54CBBB', // Text color
                  '&:hover': {
                    backgroundColor: '#54CBBB', // Background color on hover
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
         backgroundColor: '#93D1C9',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         padding: 4,
         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)',
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
           marginLeft:'150px'

         }}
       />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;

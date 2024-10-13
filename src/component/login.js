import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Videocontoh from '../assets/images/Tablet login.gif';

const LoginPage = () => {
  const navigate = useNavigate();

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
          <Box component="form" noValidate sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username or Email"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
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
              Log In
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

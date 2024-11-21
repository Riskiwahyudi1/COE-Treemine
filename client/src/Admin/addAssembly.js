import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const UpdateCustomAssemblyPage = () => {
  const [assemblyName, setAssemblyName] = useState('');
  const [assemblyPrice, setAssemblyPrice] = useState('');
  const [assemblyDescription, setAssemblyDescription] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!assemblyName || !assemblyPrice || !assemblyDescription) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Data submitted:', { assemblyName, assemblyPrice, assemblyDescription });
  };

  const handleBack = () => {
    navigate('../customAssembly'); 
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        {/* Header Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight="bold">
              Update Custom Assembly
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Typography variant="body2" mr={1}>
                {new Date().toLocaleDateString()}
              </Typography>
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Form Section */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Assembly Name *"
            variant="outlined"
            value={assemblyName}
            onChange={(e) => setAssemblyName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Price *"
            variant="outlined"
            type="number"
            value={assemblyPrice}
            onChange={(e) => setAssemblyPrice(e.target.value)}
            InputProps={{
              startAdornment: <span>Rp. </span>,
            }}
            fullWidth
            required
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              sx={{
                width: '150px',
                fontWeight: 'bold',
                borderColor: '#9c27b0',
                color: '#9c27b0',
              }}
              onClick={handleBack} 
            >
              BACK
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '150px',
                backgroundColor: '#4caf50',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#45a049' },
              }}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateCustomAssemblyPage;
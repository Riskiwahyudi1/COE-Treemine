import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import axios from 'axios';
import Toast from '../utils/Toast';
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';

const UpdateBoardTypePage = () => {
  const { adminToken } = useAuth(); 
  const [boardName, setBoardName] = useState('');
  const [boardPrice, setBoardPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate('../boardType');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!boardName || !boardPrice) {
      setError('Please fill in all fields');
      return;
    }
  
    if (typeof boardName !== 'string') {
      setError('Board name must be at least 3 characters long');
      return;
    }
  
    const price = parseFloat(boardPrice);
    if (isNaN(price)) {
      setError('Price must be a  number');
      return;
    }
  
    try {
      setLoading(true);

      if (!adminToken) {
        setError('Kamu tidak terountetikasi, silahkan login kembali!');
        setLoading(false);
        return;
    }
      const response = await axios.post(
        `${apiConfig.baseURL}admin/costom-assembly/add-component/${id}`,
        {
          type: boardName, 
          cost: price, 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`, 
        },
        }
      );
  
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Item added successfully',
        });
        navigate('../custom-assembly'); 
      } else {
        setError('Failed to update the board type. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error occurred during the update.');
      } else {
        setError('Network error. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        {/* Header Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight="bold">
              Update Custom Prototype
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
            label="Board Type Name *"
            variant="outlined"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Price *"
            variant="outlined"
            type="number"
            value={boardPrice}
            onChange={(e) => setBoardPrice(e.target.value)}
            InputProps={{
              startAdornment: <span>Rp. </span>,
            }}
            fullWidth
            required
          />

          {/* Error Display */}
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

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
              disabled={loading}
              sx={{
                width: '150px',
                backgroundColor: '#4caf50',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#45a049' },
              }}
            >
              {loading ? 'SAVING...' : 'SAVE'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateBoardTypePage;
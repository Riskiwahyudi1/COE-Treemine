import React, { useState, useEffect } from 'react';
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

const UpdateBoardTypePage = () => {
  const [formData, setFormData] = useState({ type: '', cost: '', data: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { typeId, itemId } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/costom-prototype/${typeId}/item/${itemId}`
        );
        setFormData(response.data); 
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };
    fetchData();
  }, [typeId, itemId]);
  const showDataByItemId = formData.data.find((item) => item._id === itemId);

  useEffect(() => {
    if (showDataByItemId) {
      setFormData((prevState) => ({
        ...prevState,
        type: showDataByItemId.type || '',
        cost: showDataByItemId.cost || '',
      }));
    }
  }, [showDataByItemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.type || !formData.cost) {
      alert('Please fill in all fields');
      return;
    }
  
    if (typeof formData.type !== 'string' || formData.type.trim().length < 3) {
      alert('Type must be at least 3 characters long');
      return;
    }
  
    const costValue = parseFloat(formData.cost);
    if (isNaN(costValue) || costValue <= 0) {
      alert('Cost must be a positive number');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/admin/costom-prototype/${typeId}/item/${itemId}`,
        {
          type: formData.type, 
          cost: costValue, 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Item updated successfully',
        });
        navigate('../custom-prototype'); 
      } else {
        setError('Failed to update the board type. Please try again.');
      }
    } catch (error) {
      console.error('Error during update:', error);
      setError(
        error.response?.data?.message || 'Error occurred during the update.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
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

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            name='type'
            label="Board Type Name *"
            variant="outlined"
            value={formData.type}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            name='cost'
            label="Price *"
            variant="outlined"
            type="number"
            value={formData.cost}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <span>Rp. </span>,
            }}
            fullWidth
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

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

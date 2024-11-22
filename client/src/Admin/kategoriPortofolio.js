import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import getCategories from './api/categoriesApi';
import axios from 'axios';
import Swal from 'sweetalert2';

const showToast = (message, icon) => {
  Swal.fire({
      toast: true,
      position: 'bottom-end', 
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000, 
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
  });
};

const KategoriPortfolioPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    navigate('./addCategory');
  };

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
            if (Array.isArray(data) && data.length === 0) {
              setError('Categories is empty!');
          }
        } catch (error) {
            setError('Failed to load categories');
        }
    };
    fetchCategories();
}, []);

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/product/categories/delete/${id}`);
      setCategories(categories.filter((category) => category._id !== id)); 
      if (response.status === 200) {
        showToast('category has been deleted', 'success');
      }
    } catch (error) {
      showToast('Failed to delete categoryy', 'error');
    }
  };
};

  return (
    <Container sx={{ mt: 2, minHeight: '100vh', p: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Kategori Portofolio
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="contained"
        onClick={handleAddCategory}
        sx={{
          bgcolor: '#54cbbb',
          color: '#FFFFFF',
          borderRadius: '8px',
          mb: 3,
          '&:hover': { bgcolor: '#7fd685' },
        }}
      >
        + Add Kategori
      </Button>
    {categories.length > 0 && (
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                src={`http://localhost:5000${category.picture_url}`}
                alt={category.category_name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="#333333">
                  {category.category_name}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  pb: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#54cbbb',
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: '#7fd685',
                      color: '#FFFFFF',
                      borderColor: '#7fd685',
                    },
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(category._id)}
                  sx={{
                    borderColor: '#f44336',
                    color: '#f44336',
                    '&:hover': {
                      backgroundColor: '#e0f4fc',
                      borderColor: '#f44336',
                      color: '#f44336',
                    },
                  }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
    </Container>
  );
};

export default KategoriPortfolioPage;

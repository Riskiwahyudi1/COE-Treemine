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
import { useAuth } from '../contexts/AuthContext';

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
  const { adminToken } = useAuth();
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
        if (!adminToken) {
          setError('Kamu tidak terotentikasi, silahkan login kembali!');
          return;
        }

        const response = await axios.delete(`http://localhost:5000/admin/product/categories/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });

        if (response.status === 200) {
          setCategories(categories.filter((category) => category._id !== id));
          showToast('Category has been deleted', 'success');
        } else {
          showToast('Failed to delete category. Please try again.', 'error');
        }
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Failed to delete category. Please check your connection.';
        showToast(errorMessage, 'error');
      }
    }
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
          bgcolor: '#00A63F',
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
                    onClick={() => navigate(`./edit-category/${category._id}`)}
                    sx={{
                      backgroundColor: '#00A63F',
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

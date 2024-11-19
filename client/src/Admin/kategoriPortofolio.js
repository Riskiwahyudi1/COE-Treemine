import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import pcb1 from '../assets/images/pcb1.jpeg';
import pcb2 from '../assets/images/pcb2.jpg';
import pcb3 from '../assets/images/pcb3.jpg';

const categories = [
  { id: 1, title: 'Micro controller board', img: pcb1 },
  { id: 2, title: 'Industrial Arduino Shield', img: pcb2 },
  { id: 3, title: 'Breakout Boards', img: pcb3 },
  { id: 4, title: 'Serial Boards', img: pcb3 },
  { id: 5, title: 'Motor Control', img: pcb2 },
  { id: 6, title: 'Upgrades and Components', img: pcb1 },
];

const KategoriPortfolioPage = () => {
  return (
    <Container sx={{ mt: 2, minHeight: '100vh', p: 2 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Kategori Portofolio
      </Typography>

      {/* Add Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: '#7fd685',
          color: '#FFFFFF',
          borderRadius: '8px',
          mb: 3,
          '&:hover': { bgcolor: '#7fd685' },
        }}
      >
        + Add Kategori
      </Button>

      {/* Grid of Cards */}
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
                image={category.img} // Replace with valid image path
                alt={category.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="#333333">
                  {category.title}
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
                  variant="outlined"
                  sx={{
                    color: '#1976D2',
                    '&:hover': { bgcolor: '#1976D2', color: '#FFFFFF', borderColor: '#1976D2' },
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#9C27B0',
                    '&:hover': { bgcolor: '#9C27B0', color: '#FFFFFF', borderColor: '#9C27B0' },
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
    </Container>
  );
};

export default KategoriPortfolioPage;

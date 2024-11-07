import React from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, white, #2f98cd)',
        padding: 4,
      }}
    >
      <Grid container spacing={4} maxWidth="lg">
        {/* Informasi Kontak */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            KONTAK
          </Typography>
          <Typography variant="h3" gutterBottom>
            HUBUNGI KAMI
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
            <Box ml={1}>
              <Typography variant="subtitle1">ALAMAT</Typography>
              <Typography variant="body2">Jl. Lembang 47, Menteng, Indonesia</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" mb={2}>
            <IconButton color="primary">
              <PhoneIcon />
            </IconButton>
            <Box ml={1}>
              <Typography variant="subtitle1">TELEPON</Typography>
              <Typography variant="body2">0815-11-777-999</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" mb={2}>
            <IconButton color="primary">
              <EmailIcon />
            </IconButton>
            <Box ml={1}>
              <Typography variant="subtitle1">EMAIL</Typography>
              <Typography variant="body2">info@ikaundipjakarta.org</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Form Kontak */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 4,
              borderRadius: 2,
              boxShadow: '2px 6px 12px rgba(84, 203, 187, 0.5)', // Shadow berwarna #54cbbb
            }}
          >
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  '&.Mui-focused fieldset': {
                    borderColor: '#54cbbb', // Warna border saat fokus
                  },
                },
              }}
            />
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  '&.Mui-focused fieldset': {
                    borderColor: '#54cbbb', // Warna border saat fokus
                  },
                },
              }}
            />
            <TextField
              label="Your Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  '&.Mui-focused fieldset': {
                    borderColor: '#54cbbb', // Warna border saat fokus
                  },
                },
              }}
            />
            <TextField
              label="Your Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              InputProps={{
                sx: {
                  '&.Mui-focused fieldset': {
                    borderColor: '#54cbbb', // Warna border saat fokus
                  },
                },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: '#54cbbb',
                '&:hover': {
                  backgroundColor: '#4bb5a1',
                },
              }}
            >
              Kirim Pesan
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;

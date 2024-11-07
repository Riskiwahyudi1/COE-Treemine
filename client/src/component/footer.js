import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{ backgroundColor: '#2f98cd', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    Toko PCB Online
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Menyediakan PCB berkualitas tinggi untuk seluruh Indonesia
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    Toko PCB Online
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;

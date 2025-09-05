import React, { useEffect } from 'react';
import { Typography, Container, Grid, Box, Card, CardContent, CardMedia } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import product1 from '../assets/images/1.png';
import product2 from '../assets/images/3.png';
import product3 from '../assets/images/2.png';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2f98cd',
        },
        secondary: {
            main: '#2f98cd',
        },
        background: {
            default: '#ffffff',
        },
    },
});

const LandingPage = () => {
    useEffect(() => {
        const svgElement = document.querySelector('svg');
        if (svgElement) {
            setTimeout(() => {
                svgElement.classList.add('animated');
            }, 1000);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    flexGrow: 1,
                    background: `linear-gradient(to bottom, white, white)`,
                    minHeight: '100vh',
                }}
            >
                {/* Bagian Fitur Produk */}
                <Box sx={{ bgcolor: 'transparent' }}>
                    <Container sx={{ pb: 5 }}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            align="center"
                            sx={{ fontWeight: 'bold', color: '#000000' }}
                        >
                            Kenapa Memilih PCB Kami?
                        </Typography>
                        <Grid
                            container
                            spacing={4}
                            justifyContent="center"
                            sx={{ mt: 5, mb: 5 }}
                        >
                            {[
                                {
                                    title: 'Kualitas Tinggi',
                                    description:
                                        'PCB kami dibuat dengan material terbaik dan presisi tinggi.',
                                    image: product1,
                                },
                                {
                                    title: 'Desain Kustom',
                                    description:
                                        'Kami menawarkan opsi kustomisasi fleksibel sesuai kebutuhan Anda.',
                                    image: product2,
                                },
                                {
                                    title: 'Harga Terjangkau',
                                    description:
                                        'Dapatkan PCB berkualitas terbaik dengan harga yang kompetitif.',
                                    image: product3,
                                },
                            ].map((feature, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            backgroundColor: '#00A63F',
                                            borderRadius: 2,
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                boxShadow:
                                                    '0 8px 20px rgba(0, 0, 0, 0.4)',
                                                transform: 'scale(1.02)',
                                                transition: '0.3s',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={feature.image}
                                            alt={feature.title}
                                            sx={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                align="center"
                                                gutterBottom
                                                sx={{ color: 'white', fontWeight: 'bold' }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                align="center"
                                                sx={{ color: 'white', fontSize: '0.9rem' }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LandingPage;

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    CardMedia,
    CardContent,
    Card,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import gambar produk
import product1 from '../assets/images/1.png';
import product2 from '../assets/images/3.png';
import product3 from '../assets/images/2.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TicketLandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Array produk dengan gambar yang diimport
    const productGalleries = [
        {
            photo: product1,
            nama_kegiatan: "PCB Prototype"
        },
        {
            photo: product2,
            nama_kegiatan: "PCB Assembly"
        },
        {
            photo: product3,
            nama_kegiatan: "Electronic Components"
        }
    ];

    const features = [
        {
            icon: "01",
            title: "Online Quote",
            description: "Place an order on CoE Timeline"
        },
        {
            icon: "02",
            title: "Upload PCB file",
            description: "Submit your PCB design files"
        },
        {
            icon: "03",
            title: "Order Review",
            description: "We check your specifications"
        },
        {
            icon: "04",
            title: "Payment",
            description: "Secure payment processing"
        },
        {
            icon: "05",
            title: "Fabrication",
            description: "PCB manufacturing begins"
        },
        {
            icon: "06",
            title: "Delivery",
            description: "Ships to your location"
        },
        {
            icon: "07",
            title: "Confirm Received",
            description: "Order completion verified"
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: `linear-gradient(to bottom, #2f98cd, white)`,
            px: 8 // Menambahkan padding kiri-kanan
        }}>
            <Container maxWidth="xl" sx={{ pt: 10 }}>
                {/* Hero Section */}
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 'bold',
                                mb: 2
                            }}>
                                The best PCB buying experience
                            </Typography>
                            <Typography variant="body1" sx={{  color: 'black', mb: 1 ,pt: 5 }}>
                                Dapatkan layanan PCB berkualitas tinggi dengan proses yang mudah dan cepat. Kami menyediakan solusi lengkap untuk kebutuhan elektronika Anda.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4.5}>
                        <Swiper
                            modules={[ Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                        >
                            {productGalleries.map((gallery, index) => (
                                <SwiperSlide key={index}>
                                    <Box sx={{ position: 'relative', mb: 6 }}>
                                        <Card
                                            sx={{
                                                overflow: 'hidden',
                                                borderRadius: 2,
                                                height: '300px', // Fixed height untuk konsistensi
                                                display: 'flex',
                                                flexDirection: 'column',
                                                boxShadow: 'none', // Hilangkan bayangan
                                                backgroundColor: 'transparent', // Tidak ada background
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={gallery.photo}
                                                alt={gallery.nama_kegiatan}
                                                sx={{
                                                    width: '100%',
                                                    height: '250px', // Tinggi gambar
                                                    objectFit: 'cover' // Untuk memastikan gambar terlihat penuh
                                                }}
                                            />
                                            <CardContent sx={{
                                                px: 2,
                                                py: 1,
                                                textAlign: 'center',
                                                backgroundColor: '#2f98cd',
                                                color: 'white'
                                            }}>
                                                <Typography variant="subtitle1">
                                                    {gallery.nama_kegiatan}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Grid>
                </Grid>

                {/* Bagian Features */}
                <Box sx={{ mt: 4, pb: 8, overflowX: 'auto' }}>
                    <Typography variant="h4" sx={{ color: 'black', mb: 4, fontWeight: 'bold' }}>
                        How to Use?
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        minWidth: 'min-content',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '32px',
                            left: '60px',
                            right: '60px',
                            height: '2px',
                            backgroundColor: '#e0e0e0',
                            zIndex: 0
                        }
                    }}>
                        {features.map((feature, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    minWidth: {
                                        xs: '160px',
                                        sm: '140px',
                                        md: '120px',
                                        lg: '100px'
                                    },
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(8px)',
                                    borderRadius: 2,
                                    transition: 'all 0.3s',
                                    position: 'relative',
                                    zIndex: 1,
                                    '&:hover': {
                                        boxShadow: 3,
                                        transform: 'translateY(-4px)'
                                    }
                                }}
                            >
                                <Box sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: '#2f98cd',
                                    borderRadius: 1,
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    mb: 1
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    fontSize: '0.875rem'
                                }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem'
                                }}>
                                    {feature.description}
                                </Typography>
                                {index < features.length - 1 && (
                                    <Box sx={{
                                        position: 'absolute',
                                        right: '-10px',
                                        top: '32px',
                                        color: '#2f98cd',
                                        fontWeight: 'bold',
                                        zIndex: 2
                                    }}>
                                        →
                                    </Box>
                                )}
                            </Paper>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default TicketLandingPage;
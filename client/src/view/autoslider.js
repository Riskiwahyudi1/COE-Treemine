import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    CardMedia,
    CardContent,
    Card,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import gambar produk
import product1 from '../assets/images/foto5.png';
import product2 from '../assets/images/3.png';
import product3 from '../assets/images/2.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const PCBLandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        <Box>
            {/* Hero Section with Green Background */}
            <Box sx={{
                background: '#00A63F',
                px: { xs: 2, sm: 4, md: 8 }, // Responsive padding
                color: 'white'
            }}>
                <Container maxWidth="xl" sx={{ 
                    pt: { xs: 2, sm: 3, md: 1 }, 
                    pb: { xs: 2, sm: 3, md: 1 } 
                }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Box>
                                <Typography variant="h3" sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: 'white',
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } // Responsive font size
                                }}>
                                    The best PCB buying experience
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    color: 'white', 
                                    mb: 1, 
                                    pt: { xs: 2, sm: 3, md: 4 },
                                    opacity: 0.9,
                                    fontSize: { xs: '0.875rem', sm: '1rem' } // Responsive font size
                                }}>
                                    Dapatkan layanan PCB berkualitas tinggi dengan proses yang mudah dan cepat. Kami menyediakan solusi lengkap untuk kebutuhan elektronika Anda.
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                width: '100%',
                                maxWidth: { xs: '100%', sm: '400px' },
                                margin: '0 auto'
                            }}>
                                <Swiper
                                    modules={[Pagination, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    centeredSlides={true}
                                    loop={true}
                                    pagination={{ 
                                        clickable: true,
                                        bulletActiveClass: 'swiper-pagination-bullet-active',
                                        bulletClass: 'swiper-pagination-bullet',
                                        modifierClass: 'swiper-pagination-',
                                        bulletElement: 'span',
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    style={{
                                        '--swiper-pagination-color': '#ffffff',
                                        '--swiper-pagination-bullet-inactive-color': 'rgba(255, 255, 255, 0.5)',
                                    }}
                                >
                                    {productGalleries.map((gallery, index) => (
                                        <SwiperSlide key={index}>
                                            <Box sx={{ 
                                                position: 'relative', 
                                                mb: 6,
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                                <Card
                                                    sx={{
                                                        overflow: 'hidden',
                                                        borderRadius: 2,
                                                        height: { xs: '200px', sm: '250px' },
                                                        width: '100%',
                                                        maxWidth: '500px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        boxShadow: 'none',
                                                        backgroundColor: 'transparent',
                                                    }}
                                                >
                                                    <Box sx={{
                                                        position: 'relative',
                                                        height: { xs: '150px', sm: '200px' },
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <CardMedia
                                                            component="img"
                                                            image={gallery.photo}
                                                            alt={gallery.nama_kegiatan}
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                    </Box>
                                                    <CardContent sx={{
                                                        px: 2,
                                                        py: 1,
                                                        textAlign: 'center',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                        color: 'white'
                                                    }}>
                                                        <Typography variant="subtitle1" sx={{
                                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                                        }}>
                                                            {gallery.nama_kegiatan}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How to Use Section with White Background */}
            <Box sx={{ 
                bgcolor: 'white',
                px: { xs: 3, sm: 5, md: 8 },
                pt: 1
            }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ 
                        color: '#00A63F',
                        mb: 1, 
                        fontWeight: 'bold',
                        fontSize: { xs: '1.5rem', sm: '2rem' }
                    }}>
                        How to Use?
                    </Typography>
                    
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 2 },
                        minWidth: 'min-content',
                        position: 'relative',
                        overflowX: 'auto',
                        pb: 4,
                        px: 2,
                        '&::-webkit-scrollbar': {
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#00A63F',
                            borderRadius: '4px',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '32px',
                            left: '60px',
                            right: '60px',
                            height: '2px',
                            backgroundColor: '#00A63F',
                            opacity: 0.3,
                            zIndex: 0
                        }
                    }}>
                        {features.map((feature, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: { xs: 1.5, sm: 2 },
                                    minWidth: {
                                        xs: '140px',
                                        sm: '160px',
                                        md: '140px',
                                        lg: '120px'
                                    },
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                    backgroundColor: '#00A63F',
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1,
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 4px 20px rgba(0, 166, 63, 0.2)'
                                    }
                                }}
                            >
                                <Box sx={{
                                    width: { xs: 24, sm: 28 },
                                    height: { xs: 24, sm: 28 },
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: 1,
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                    fontWeight: 'bold',
                                    mb: 1
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography sx={{
                                    fontWeight: 600,
                                    color: 'white',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    px: 1
                                }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default PCBLandingPage;
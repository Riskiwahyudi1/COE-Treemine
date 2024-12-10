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

// Impor gambar produk
import product1 from '../assets/images/foto5.png';
import product2 from '../assets/images/3.png';
import product3 from '../assets/images/2.png';

// Impor gaya Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const PCBLandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const galeriProduk = [
        {
            foto: product1,
            nama_kegiatan: "Prototipe PCB"
        },
        {
            foto: product2,
            nama_kegiatan: "Perakitan PCB"
        },
        {
            foto: product3,
            nama_kegiatan: "Komponen Elektronik"
        }
    ];

    const fitur = [
        {
            ikon: "01",
            judul: "Kutipan Online",
            deskripsi: "Pesan melalui CoE Treemine"
        },
        {
            ikon: "02",
            judul: "Unggah File PCB",
            deskripsi: "Kirimkan file desain PCB Anda"
        },
        {
            ikon: "03",
            judul: "Tinjauan Pesanan",
            deskripsi: "Kami memeriksa spesifikasi Anda"
        },
        {
            ikon: "04",
            judul: "Pembayaran",
            deskripsi: "Proses pembayaran aman"
        },
        {
            ikon: "05",
            judul: "Pembuatan",
            deskripsi: "Proses pembuatan PCB dimulai"
        },
        {
            ikon: "06",
            judul: "Pengiriman",
            deskripsi: "Dikirim ke lokasi Anda"
        },
        {
            ikon: "07",
            judul: "Konfirmasi Diterima",
            deskripsi: "Penyelesaian pesanan diverifikasi"
        }
    ];

    return (
        <Box>
            {/* Bagian Hero dengan Latar Hijau */}
            <Box sx={{
                background: '#00A63F',
                px: { xs: 2, sm: 4, md: 8 }, // Padding responsif
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
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } // Ukuran font responsif
                                }}>
                                    Pengalaman Terbaik Membeli PCB
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    color: 'white', 
                                    mb: 1, 
                                    pt: { xs: 2, sm: 3, md: 4 },
                                    opacity: 0.9,
                                    fontSize: { xs: '0.875rem', sm: '1rem' } // Ukuran font responsif
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
                                    {galeriProduk.map((galeri, index) => (
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
                                                            image={galeri.foto}
                                                            alt={galeri.nama_kegiatan}
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
                                                            {galeri.nama_kegiatan}
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

            {/* Bagian Cara Menggunakan dengan Latar Putih */}
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
                        Cara Menggunakan?
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
                        {fitur.map((fitur, index) => (
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
                                    {fitur.ikon}
                                </Box>
                                <Typography sx={{
                                    fontWeight: 600,
                                    color: 'white',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}>
                                    {fitur.judul}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    px: 1
                                }}>
                                    {fitur.deskripsi}
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

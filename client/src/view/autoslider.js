import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import gambar lokal
import pcb1 from '../assets/images/pcb1.jpeg';
import pcb2 from '../assets/images/pcb2.jpg';
import pcb3 from '../assets/images/pcb3.jpg';
import pcb4 from '../assets/images/pcb4.jpg';

// Komponen wadah untuk slider
const SliderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '400px',
    position: 'relative',
    overflow: 'hidden',
}));

// Komponen untuk menampung semua slide
const SlidesWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
}));

// Komponen untuk satu slide
const Slide = styled(Box)({
    minWidth: '100%',
    height: '100%',
});

// Komponen untuk titik-titik indikator
const DotsContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: theme.spacing(1),
    zIndex: 1,
}));

// Komponen untuk satu titik indikator
const Dot = styled(Paper)(({ active }) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: active ? '#fff' : 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
}));

// Data slide - gunakan gambar lokal
const slides = [
    { image: pcb1, alt: 'pcb1' },
    { image: pcb2, alt: 'pcb2' },
    { image: pcb3, alt: 'pcb3' },
    { image: pcb4, alt: 'pcb4' },
];

const AutoSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Efek untuk auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => 
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000); // Ganti slide setiap 5 detik

        return () => clearInterval(timer);
    }, []);

    // Fungsi untuk mengganti slide saat titik diklik
    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <SliderContainer>
            <SlidesWrapper sx={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <Slide key={index}>
                        <Box
                            component="img"
                            src={slide.image}
                            alt={slide.alt}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Slide>
                ))}
            </SlidesWrapper>
            <DotsContainer>
                {slides.map((_, index) => (
                    <Dot
                        key={index}
                        active={currentSlide === index}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </DotsContainer>
        </SliderContainer>
    );
};

export default AutoSlider;

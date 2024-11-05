import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { Smartphone, Eye, Sparkles, ThumbsUp, CheckCircle } from 'lucide-react';
import vid from '../assets/images/Firmware.gif';

export default function TicketLandingPage() {
    const features = [
        {
            icon: <Smartphone style={{ width: 24, height: 24 }} />,
            title: "Responsive Layout",
            description: "Works perfectly on all devices"
        },
        {
            icon: <Eye style={{ width: 24, height: 24 }} />,
            title: "System Ready",
            description: "Ready to use anytime every time"
        },
        {
            icon: <Sparkles style={{ width: 24, height: 24 }} />,
            title: "Smart Tools",
            description: "Advanced features included"
        },
        {
            icon: <ThumbsUp style={{ width: 24, height: 24 }} />,
            title: "Easy to Use",
            description: "Simple and intuitive interface"
        },
        {
            icon: <CheckCircle style={{ width: 24, height: 24 }} />,
            title: "Great Design",
            description: "Modern and clean design"
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: `linear-gradient(to bottom, #2f98cd, white)`
        }}>
            <Container sx={{ pt: 8 }}>
                {/* Hero Section */}
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 'bold',
                                mb: 2
                            }}>
                                The best PCB buying experience
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                yrgveyindrui uiywegdryrgnuedir iuydrniyersnye iegrdn weygdr wieyrd we diewygr d7wetrf xwyegfdoweufg qyegfy ceqvfegwix fqgeyiv cfyiex fyiev  diuefiodufgoy yefg yiywzgfueg 
                            </Typography>
                            <Box
                                component="button"
                                sx={{
                                    backgroundColor: '#54cbbb',
                                    color: 'white',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 50,
                                    border: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.9
                                    }
                                }}
                            >
                                Learn More
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{
                                position: 'absolute',
                                width: 300,
                                height: 300,
                                borderRadius: '50%',
                                backgroundColor: '#7fd685',
                                filter: 'blur(60px)',
                                opacity: 0.3,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 0
                            }} />
                            <Box
                                component="img"
                                src={vid}
                                alt="Mobile app preview"
                                sx={{
                                    width: '100%',
                                    maxWidth: 400,
                                    mx: 'auto',
                                    display: 'block',
                                    // transform: 'rotate(12deg)',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Features Section */}
                <Grid container spacing={4} sx={{ mt: 4, pb: 8 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={6} md={2.4} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(8px)',
                                    borderRadius: 2,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    backgroundColor: '#2f98cd',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
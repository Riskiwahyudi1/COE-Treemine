import { createTheme } from '@mui/material/styles';
import heroImage from '../assets/images/pcb4.jpg';
import product1 from '../assets/images/pcb1.jpeg';
import product2 from '../assets/images/pcb2.jpg';
import product3 from '../assets/images/pcb3.jpg';

const config = {
    theme: createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#ff4081',
            },
        },
    }),
    products: [
        {
            id: 1,
            name: 'PCB 4 Layer - High Quality',
            price: 'Rp 500,000',
            image: product1,
        },
        {
            id: 2,
            name: 'PCB 6 Layer - Custom Design',
            price: 'Rp 750,000',
            image: product2,
        },
        {
            id: 3,
            name: 'PCB 8 Layer - Premium Build',
            price: 'Rp 1,000,000',
            image: product3,
        },
        {
            id: 4,
            name: 'PCB 10 Layer - VVIP Build',
            price: 'Rp 1,500,000',
            image: heroImage,
        },
    ],
};

export default config;

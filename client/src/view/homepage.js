import React from 'react';
import { Box } from '@mui/material';
import ShopCard from './shopCard';
import PCBcustom from './pcbCustom';
import Autoslider from './autoslider';
import About from './about';
import { Helmet } from "react-helmet";

const LandingPage = () => {
    return (
        <Box sx={{
            minHeight: '100vh'
        }}>
            <Helmet>
                <title>COE Treemiene | Home</title>
            </Helmet>
            <Autoslider />
            <ShopCard />
            <PCBcustom />
            <About />
        </Box>
    );
};

export default LandingPage;

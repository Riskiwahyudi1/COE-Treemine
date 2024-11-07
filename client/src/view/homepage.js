import React from 'react';
import { Box } from '@mui/material';
import ShopCard from './shopCard';
import PCBcustom from './pcbCustom';
import Autoslider from './autoslider';
import Service from './service';
import About from './about';

const LandingPage = () => {
    return (
        <Box sx={{
            minHeight: '100vh'}}>
            <Autoslider/>
            <About />
            <PCBcustom />
            <ShopCard />
            <Service />
        </Box>
    );
};

export default LandingPage;

import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                padding: 2,
                textAlign: 'center',
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }}
        >
            <Typography variant="body1" color="white">
                © 2024 COE Treemine. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;

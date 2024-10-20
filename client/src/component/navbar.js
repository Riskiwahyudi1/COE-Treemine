import React, { useState, useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Badge,
    Box,
    Tabs,
    Tab,
    Button,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import Logoweb from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Navbar = () => {
    const navigate = useNavigate(); // Untuk navigasi
    const { isAuthenticated, logout } = useAuth();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null); // State untuk buka/tutup menu avatar

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget); // Set posisi menu
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Tutup menu
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const paths = ['/', '/product', '/custom', '/product-assembly', '/service'];
        navigate(paths[newValue] || '/');
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigasi ke halaman login
    };

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#84c9ef' }} elevation={0}>
                <Toolbar>
                    <Box
                        component="img"
                        src={Logoweb}
                        alt="Logo"
                        sx={{ height: 40, marginRight: 2 }}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CoE Treemine
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search in site"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    {/* Render tombol Login atau Avatar berdasarkan status isAuthenticated */}
                    {!isAuthenticated ? (
                        <Button
                            variant="contained"
                            sx={{ ml: 1, bgcolor: '#d565be', '&:hover': { bgcolor: '#c054a9' } }}
                            onClick={handleLoginClick}
                        >
                            Login
                        </Button>
                    ) : (
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                            </IconButton>

                            <IconButton color="inherit">
                                <HistoryIcon />
                            </IconButton>
                            <Avatar
                                onClick={handleOpenMenu}
                                sx={{ cursor: 'pointer', bgcolor: 'primary.main' }}
                            >
                                U
                            </Avatar>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={() => { logout(); handleCloseMenu(); }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <AppBar position="static" sx={{ bgcolor: '#84c9ef' }} elevation={1}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Home" />
                    <Tab label="Product" />
                    <Tab label="Custom Product" />
                    <Tab label="Product Assembly" />
                    <Tab label="Service" />
                </Tabs>
            </AppBar>
        </>
    );
};

export default Navbar;

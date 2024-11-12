import React, { useState } from 'react';
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
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import BuildIcon from '@mui/icons-material/Build';
import HandymanIcon from '@mui/icons-material/Handyman';
import { useNavigate } from 'react-router-dom';
import Logoweb from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2f98cd',
        },
        secondary: {
            main: '#ffffff', // Set secondary color to white
        },
    },
});

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Product', icon: <ShopIcon />, path: '/product' },
        { text: 'Custom Product', icon: <BuildIcon />, path: '/custom' },
        { text: 'Service', icon: <HandymanIcon />, path: '/service' },
    ];

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(menuItems[newValue].path);
    };

    const handleMobileMenuClick = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleKeranjang = () => {
        navigate('/keranjang');
    };



    const renderMobileDrawer = () => (
        <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
        >
            <Box sx={{ width: 250 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => handleMobileMenuClick(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{ bgcolor: '#2f98cd' }} elevation={0}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box
                        component="img"
                        src={Logoweb}
                        alt="Logo"
                        sx={{ height: 40, marginRight: 2 }}
                    />

                    {!isMobile && (
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            CoE Treemine
                        </Typography>
                    )}

                    {!isMobile && (
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search in site"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    {!isAuthenticated ? (
                        <Button
                            variant="contained"
                            sx={{
                                ml: 1,
                                bgcolor: '#54cbbb',
                                '&:hover': { bgcolor: '#7fd685' },
                                ...(isMobile && { fontSize: '0.8rem', padding: '6px 12px' })
                            }}
                            onClick={handleLoginClick}
                        >
                            Login
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                onClick={handleKeranjang}>
                                <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
                                    <Badge badgeContent={4} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>

                            <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
                                <HistoryIcon />
                            </IconButton>

                            <Avatar
                                onClick={handleOpenMenu}
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: 'primary.main',
                                    ...(isMobile && { width: 32, height: 32 })
                                }}
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

            {!isMobile && (
                <AppBar position="fixed" sx={{ bgcolor: '#2f98cd', top: 64 }} elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        indicatorColor="secondary" // Set indicator color to white
                        textColor="inherit"
                    >
                        {menuItems.map((item) => (
                            <Tab key={item.text} label={item.text} />
                        ))}
                    </Tabs>
                </AppBar>
            )}

            {renderMobileDrawer()}

            {/* Add padding to main content to avoid being covered by fixed AppBar */}
            <Box sx={{ mt: { xs: 8, md: 14 } }}>
                {/* Konten utama website Anda di sini */}
            </Box>
        </ThemeProvider>
    );
};

export default Navbar;

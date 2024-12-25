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
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import Logoweb from '../assets/images/logo9.png';
import { useAuth } from '../contexts/AuthContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00A63F',
        },
        secondary: {
            main: '#00A63F',
        },
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
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
    color: '#00A63F',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#00A63F',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        '&::placeholder': {
            color: '#00A63F',
            opacity: 0.7,
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
        { text: 'Home', icon: <HomeIcon sx={{ color: '#00A63F' }} />, path: '/' },
        { text: 'Product', icon: <ShopIcon sx={{ color: '#00A63F' }} />, path: '/product' },
        // { text: 'Category Product', icon: <CategoryIcon sx={{ color: '#00A63F' }} />, path: '/category-product' },
        { text: 'Custom Product', icon: <BuildIcon sx={{ color: '#00A63F' }} />, path: '/custom' },
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

    const handleProfileMenu = () => {
        navigate('/user');
    };
    const handleTransaksiPage = () => {
        navigate('/transaksi?status=menunggu-pembayaran');
    };

    const renderMobileDrawer = () => (
        <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
        >
            <Box sx={{ width: 250, bgcolor: 'white' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => handleMobileMenuClick(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: '#00A63F'
                                    }
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{ bgcolor: 'white' }} elevation={1}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ mr: 2, color: '#00A63F' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box
                        component="img"
                        src={Logoweb}
                        alt="Logo"
                        sx={{
                            height: 40,
                            marginRight: 2,
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    />

                    {!isMobile && (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                cursor: 'pointer',
                                color: '#00A63F',
                            }}
                            onClick={() => navigate('/')}
                        >
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
                                bgcolor: '#00A63F',
                                '&:hover': { bgcolor: '#008f37' },
                                ...(isMobile && { fontSize: '0.8rem', padding: '6px 12px' }),
                            }}
                            onClick={handleLoginClick}
                        >
                            Login
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box onClick={handleKeranjang}>
                                <IconButton
                                    size={isMobile ? 'small' : 'medium'}
                                    sx={{ color: '#00A63F' }}
                                >
                                    <Badge>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>

                            <Avatar
                                onClick={handleOpenMenu}
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: '#00A63F',
                                    ml: 1,
                                    ...(isMobile && { width: 32, height: 32 }),
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
                                <MenuItem onClick={handleProfileMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleTransaksiPage}>Transaksi</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                        handleCloseMenu();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {!isMobile && (
                <AppBar
                    position="fixed"
                    sx={{
                        bgcolor: 'white',
                        top: 64,
                        '& .MuiTab-root': {
                            color: '#00A63F',
                            '&.Mui-selected': {
                                color: '#00A63F',
                            }
                        }
                    }}
                    elevation={1}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        indicatorColor="secondary"
                    >
                        {menuItems.map((item) => (
                            <Tab key={item.text} label={item.text} />
                        ))}
                    </Tabs>
                </AppBar>
            )}

            {renderMobileDrawer()}

            <Box sx={{ mt: { xs: 8, md: 14 } }}>
                {/* Konten utama website Anda di sini */}
            </Box>
        </ThemeProvider>
    );
};

export default Navbar;
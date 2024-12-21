import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import Logoweb from '../assets/images/logo.png';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 240;

// Add these styled components
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    background: '#00A63F',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#00A63F',
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: '#00A63F',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuStates, setMenuStates] = React.useState({});

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubmenuClick = (menuId) => {
        setMenuStates((prev) => ({
            ...prev,
            [menuId]: !prev[menuId],
        }));
    };

   

    const menuItems = [
        {
            text: 'Setting',
            icon: <SettingsIcon />,
            submenu: [
                {
                    text: 'Profile Setting',
                    icon: <PersonIcon />,
                    path: 'user'
                },
                {
                    text: 'Change password',
                    icon: <LockIcon />,
                    path: 'change-password'
                }
            ]
        },
        {
            text: 'Pesanan',
            icon: <ShoppingCartIcon />,
            submenu: [
                
                {
                    text: 'Pembayaran',
                    icon: <FactCheckIcon />,
                    path: '/transaksi?status=menunggu-pembayaran'
                },
                {
                    text: 'Diproses',
                    icon: <EngineeringIcon />,
                    path: '/transaksi?status=diproses'
                },
                {
                    text: 'Dikirim',
                    icon: <LocalShippingIcon />,
                    path: '/transaksi?status=dikirim'
                },
                {
                    text: 'Selesai',
                    icon: <CheckCircleIcon />,
                    path: '/transaksi?status=selesai'
                },
                {
                    text: 'Dibatalkan',
                    icon: <CancelIcon />,
                    path: '/transaksi?status=dibatalkan'
                }
            ]
        },
        {
            text: 'Back',
            icon: <ArrowBackIcon />,
            path: '/'
        },
    ];

    const LogoContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    });
    
    // Styled component untuk logo image
    const LogoImage = styled('img')({
        height: '50px', 
        width: 'auto',
        objectFit: 'contain',
    });
    const token = localStorage.getItem('token');

    let username = ''; 

    if (token) {
        try {
            const decoded = jwtDecode(token);
            username = decoded.username; 
        } catch (error) {
            console.error("Failed to decode JWT:", error);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <LogoContainer>
                        <LogoImage
                            src={Logoweb} // Sesuaikan dengan path logo Anda
                            alt="CoE Treemine Logo"
                        />
                        <Typography variant="h6" noWrap component="div" sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                        }}>
                            CoE Treemine
                        </Typography>
                    </LogoContainer>
                    <Avatar
                        onClick={handleOpenMenu}
                        sx={{
                            cursor: 'pointer',
                            bgcolor: '#ffff',
                            marginLeft: 'auto',
                            color: '#54cbbb',
                            fontWeight: 'bold',
                        }}
                    >
                        U
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h6" noWrap sx={{ color: '#ffffff', marginLeft: '25px'}}>
                        Hi, {username}
                    </Typography>
                    <IconButton onClick={handleDrawerClose} sx={{ color: '#ffffff' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.text}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => item.submenu ? handleSubmenuClick(item.text) : null}
                                    component={item.submenu ? 'div' : Link}
                                    to={item.submenu ? undefined : item.path}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#ffffff',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{ opacity: open ? 1 : 0, color: '#ffffff' }}
                                    />
                                    {item.submenu && open && (
                                        menuStates[item.text] ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                            {item.submenu && (
                                <Collapse in={open && menuStates[item.text]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.submenu.map((subItem) => (
                                            <ListItemButton
                                                key={subItem.text}
                                                component={Link}
                                                to={subItem.path}
                                                sx={{
                                                    pl: 4,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                    }
                                                }}
                                            >
                                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={subItem.text}
                                                    sx={{ color: '#ffffff' }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}
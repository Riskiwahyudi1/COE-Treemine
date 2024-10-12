import React from 'react';
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
    Button
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logoweb from '../assets/images/logo.png'; // Import logo

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
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        // Navigasi berdasarkan tab yang dipilih
        switch (newValue) {
            case 0:
                navigate('/'); // Home
                break;
            case 1:
                navigate('/product'); // Custom
                break;
            case 2:
                navigate('/custom'); // Product
                break;
            case 3:
                navigate('/product-assembly'); // Service
                break;
            case 4:
                navigate('/service'); // Product Assembly
                break;
            default:
                break;
        }
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
                        sx={{ height: 40, marginRight: 2 }} // Ukuran logo
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

                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <HistoryIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        sx={{ ml: 1, bgcolor: '#d565be', '&:hover': { bgcolor: '#c054a9' } }}
                        onClick={handleLoginClick} // Panggil fungsi navigasi saat tombol di klik
                    >
                        Login
                    </Button>
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

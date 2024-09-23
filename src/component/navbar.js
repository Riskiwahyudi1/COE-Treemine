import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logoweb from '../assets/images/logo.png';

const pages = ['Home', 'Products', 'About'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Fungsi untuk navigasi ke halaman login
    const handleLogin = () => {
        navigate('/login'); // Arahkan pengguna ke halaman login
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: '#84c9ef' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo untuk desktop */}
                    <Box
                        component="img"
                        sx={{
                            height: 65,
                            display: { xs: 'none', md: 'flex' },
                            mr: 0, mt: 1,
                        }}
                        alt="COE Treemine Logo"
                        src={Logoweb}
                    />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>

                    {/* Menu untuk mobile */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo untuk mobile */}
                    <Box
                        component="img"
                        sx={{
                            height: 40,
                            display: { xs: 'flex', md: 'none' },
                            mr: 2,
                        }}
                        alt="COE Treemine Logo"
                        src={Logoweb}
                    />

                    {/* Menu untuk desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Tombol Login */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: '#d565be', color: 'white' }}
                            onClick={handleLogin} // Navigasi ke halaman login
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;

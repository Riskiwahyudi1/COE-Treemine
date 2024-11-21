import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Facebook, Twitter, LinkedIn, YouTube } from "@mui/icons-material";
import Logoweb from "../assets/images/logo 2.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2f98cd", // Warna biru seperti di gambar
        color: "#ffffff",
        padding: "40px 20px",
        textAlign: "center", // Menengahkan teks di setiap grid
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Logo Section */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <img
              src={Logoweb}
              alt="Logo"
              style={{ maxWidth: "150px", objectFit: "contain" }}
            />
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Toko PCB Online
          </Typography>
          <Typography>Call Us: <strong>082268850986</strong></Typography>
          <Typography>Email: coetreemine@gmail.com</Typography>
          <Typography>Alamat: Politeknik Negeri Batam</Typography>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Contact with us
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={1}>
            <Facebook />
            <Twitter />
            <LinkedIn />
            <YouTube />
          </Box>
          <Box mt={2}>
            <Typography>
              Copyright PBL IF029 2024
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;


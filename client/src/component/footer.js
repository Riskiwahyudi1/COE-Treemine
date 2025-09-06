import React from "react";
import { Box, Typography, Grid, Tooltip } from "@mui/material";
import { Facebook, Twitter, LinkedIn, YouTube } from "@mui/icons-material";
import Logoweb from "../assets/images/logo 2.png";

const Footer = () => {
  const anggota = `
      -- Development Team --
      3312311091 - Riski Wahyudi
      3312311043 - Jesen Wijaya
      3312311016 - Chelsea Anayah Maharani
      3312311009 - Duta Pratama Alamsyah
        `;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#00A63F",
        color: "#F5F5F5",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <img
              src={Logoweb}
              alt="Logo"
              style={{ maxWidth: "150px", objectFit: "contain" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Toko PCB Online
          </Typography>
          <Typography>
            Call Us: <strong>082268850986</strong>
          </Typography>
          <Typography>Email: coetreemine@gmail.com</Typography>
          <Typography>Alamat: Politeknik Negeri Batam</Typography>
        </Grid>

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
            <Tooltip title={<pre>{anggota}</pre>} arrow placement="top">
              <Typography sx={{ cursor: "pointer" }}>
                 © PBL IF029 2024
              </Typography>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

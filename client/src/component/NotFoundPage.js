import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #00A63F 40%, #f0fdf4 100%)",
        color: "#1a1a1a",
        p: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "6rem", md: "10rem" },
          color: "#fff",
          textShadow: "4px 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mt: 2,
          fontWeight: 600,
          color: "#004d1a",
        }}
      >
        Oops! Halaman tidak ditemukan
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 1,
          mb: 4,
          maxWidth: "500px",
          color: "#1a1a1a",
        }}
      >
        Sepertinya halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </Typography>

      <Button
        variant="contained"
        size="large"
         onClick={handleBack} 
        sx={{
          backgroundColor: "#00A63F",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(0,166,63,0.4)",
          "&:hover": {
            backgroundColor: "#009537",
            boxShadow: "0 6px 16px rgba(0,166,63,0.6)",
          },
        }}
      >
        Kembali
      </Button>
    </Box>
  );
}

export default NotFoundPage;

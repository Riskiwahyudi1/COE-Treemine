import React from "react";
import { Box, Typography, Avatar, Button, TextField, Grid, Paper, MenuItem } from "@mui/material";

export default function ProfileSettings() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#1B2D3F",
          marginBottom: 2,
        }}
      >
        Pengaturan Profil
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#757575",
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        Perbarui informasi pribadi Anda untuk memastikan data tetap up-to-date.
      </Typography>

      {/* Formulir Pengaturan */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: "800px", // Membuat form lebih lebar
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              marginBottom: 2,
            }}
            src="/default-avatar.png"
          />
          <Button variant="contained" sx={{ backgroundColor: "#54cbbb", textTransform: "none" }}>
            Ganti Foto
          </Button>
        </Box>

        {/* Formulir */}
        <Grid container spacing={3}>
          {/* Nama Lengkap */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              variant="outlined"
              defaultValue="John Doe"
            />
          </Grid>

          {/* Jenis Kelamin */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Jenis Kelamin"
              variant="outlined"
              defaultValue="Laki-laki"
            >
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </TextField>
          </Grid>

          {/* Tanggal Lahir */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tanggal Lahir"
              type="date"
              variant="outlined"
              defaultValue="2000-01-01"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Nomor Telepon */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nomor Telepon"
              variant="outlined"
              defaultValue="08123456789"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              defaultValue="johndoe@example.com"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Alamat */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Alamat"
              variant="outlined"
              defaultValue="Jl. Contoh Alamat No.123, Jakarta"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>

        {/* Tombol Aksi */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#54cbbb", textTransform: "none", color: "#fff" }}
          >
            Simpan Perubahan
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

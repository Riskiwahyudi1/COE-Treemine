import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Grid, Paper, MenuItem, Alert, CircularProgress } from "@mui/material";
import { getProvinces, getCities } from "../api/service/rajaOngkirApi"
import { getDataAccount } from "../api/auth/dataAccount"
import Toast from "../utils/Toast";
import Dialog from "../utils/Dialog";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function ProfileSettings() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [dataAccount, setDataAccount] = useState({ address: {} });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    province: '',
    city: '',
    postal_code: '',
    detail_address: '',
    profile_picture: null

  })
  // state default
  useEffect(() => {
    setProfilePhoto(`http://localhost:5000${dataAccount.profile_picture_url}`);
  }, [dataAccount]);

  useEffect(() => {
    setSelectedProvince(`${dataAccount.address.province}`);
  }, [dataAccount]);

  useEffect(() => {
    setSelectedCity(`${dataAccount.address.city}`);
  }, [dataAccount]);

  // handle foto profil
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_picture: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // handle update profile
  const handleEdit = () => {
    navigate('./profileSettings');
};

  // data akun default
  useEffect(() => {
    const fetchDataAccount = async () => {
      try {
        const data = await getDataAccount();
        setDataAccount(data);

        setFormData({
          ...formData,
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          birthday: data.birthday,
          province: data.address.province,
          city: data.address.city,
          postal_code: data.address.postal_code,
          detail_address: data.address.detail_address,
          profile_picture: data.profile_picture
        });
      } catch (error) {
      }
    };
    fetchDataAccount();
  }, []);

  // data semua provinsi
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {

      }
    };
    fetchProvinces();
  }, []);

  // data kota berdasarkan profinsi
  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const data = await getCities(selectedProvince);
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities", error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);


  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectProvince = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSelectedProvince(e.target.value)
  }
  const handleSelectCity = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSelectedCity(e.target.value)
  }

  const handleMultipleChanges = (e) => {
    const { name } = e.target;

    if (name === "province") {
      handleSelectProvince(e);
    } else if (name === "city") {
      handleSelectCity(e);
    } else {
      handleChange(e);
    }

  };


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
          maxWidth: "800px",
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
              border: "1px solid #007BFF",
              borderColor: "primary.main",
            }}
            src={profilePhoto}
          />
        </Box>

        {/* Formulir */}
        <Grid container spacing={3}>
          {/* Username */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              variant="outlined"
              value={dataAccount.username || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Nama Lengkap */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              label="Nama Lengkap"
              variant="outlined"
              value={formData.name || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Jenis Kelamin */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="gender"
              label="Jenis Kelamin"
              variant="outlined"
              value={formData.gender || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Tanggal Lahir */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="birthday"
              label="Tanggal Lahir"
              variant="outlined"
              value={
                formData.birthday
                  ? new Date(formData.birthday).toISOString().split('T')[0]
                  : ""
              }
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Nomor Telepon */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone"
              label="Nomor Telepon"
              variant="outlined"
              value={formData.phone || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={formData.email || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Provinsi */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Provinsi"
              variant="outlined"
              value={selectedProvince || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Kota */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kab/Kota"
              variant="outlined"
              value={selectedCity || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Kode Pos */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="postal_code"
              label="Kode Pos"
              variant="outlined"
              value={formData.postal_code || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Detail Alamat */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="detail_address"
              label="Detail Alamat"
              variant="outlined"
              value={formData.detail_address || ""}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Tombol Aksi */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button
            type="submit"
            onClick={handleEdit}
            variant="contained"
            sx={{ backgroundColor: "#00A63F", textTransform: "none", color: "#fff" }}
            
          >Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

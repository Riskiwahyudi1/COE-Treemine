import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Grid, Paper } from "@mui/material";
import { getProvinces, getCities } from "../api/service/rajaOngkirApi"
import { getDataAccount } from "../api/auth/dataAccount"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';


export default function ProfileSettings() {
  const { userToken } = useAuth(); 
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [provinces, setProvinces] = useState('');
  const [cities, setCities] = useState();
  const [dataAccount, setDataAccount] = useState({ address: {} });
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
  console.log('formData', formData)
  // state default
  useEffect(() => {
    setProfilePhoto(`${apiConfig.baseURL}${dataAccount.profile_picture_url}`);
  }, [dataAccount]);

  // handle update profile
  const handleEdit = () => {
    navigate('./profileSettings');
};

  // data akun default
  useEffect(() => {
    const fetchDataAccount = async () => {
      try {
        const data = await getDataAccount(userToken);
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

//  provinsi user
  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const dataProvinces = await getProvinces(userToken);
        console.log('data prov',dataProvinces)
        if (dataProvinces) {
          const province = dataProvinces.data.find(
            (prov) => prov?.id === Number(formData.province)
          );
          setProvinces(province?.name || "Provinsi tidak ditemukan");
        }
      } catch (error) {
        setProvinces("Gagal memuat data provinsi");
      }
    };

    if (formData.province) {
      fetchProvince();
    }
  }, [formData.province]);

  // kota berdasarkan profinsi
  useEffect(() => {
  if (formData.province) {
    const fetchCities = async () => {
      try {
        const dataCity = await getCities(formData.province);
        if (dataCity) {
          const city = dataCity.find(
            (cities) => cities.id === Number(formData.city)
          );
          setCities(city?.name || "Kota tidak ditemukan");
        }
      } catch (error) {
        setCities('Gagal memuat data kota'); 
      }
    };
    fetchCities();
  } else {
    setCities([]); 
  }
}, [formData.province]);



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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detail Alamat"
              variant="outlined"
              value={`${formData.detail_address || ''}, ${cities || ''}, ${provinces || ''}, ${formData.postal_code || ''}`}
              multiline
              rows={3}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
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

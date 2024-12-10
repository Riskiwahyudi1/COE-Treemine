import React, {useEffect, useState} from "react";
import { Box, Typography, Avatar, Button, TextField, Grid, Paper, MenuItem , Alert} from "@mui/material";
import { getProvinces, getCities } from "../api/service/rajaOngkirApi"
import { getDataAccount } from "../api/auth/dataAccount"


export default function ProfileSettings() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [dataAccount, setDataAccount] = useState("");
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: ''

  })

console.log(formData)
  useEffect(() => {
    const fetchDataAccount = async () => {
        try {
            const data = await getDataAccount();
            setDataAccount(data);
        } catch (error) {

        }
    };
    fetchDataAccount();
}, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
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
            }}
            src="/default-avatar.png"
          />
          <Button variant="contained" sx={{ backgroundColor: "#00A63F", textTransform: "none" }}>
            Ganti Foto
          </Button>
        </Box>

        {/* Formulir */}
        <Grid container spacing={3}>
          {/* Nama Lengkap */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              label="Nama Lengkap"
              variant="outlined"
              defaultValue="John Doe"
              onChange={handleChange}
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
              name="phone"
              label="Nomor Telepon"
              variant="outlined"
              onChange={handleChange}
              value={dataAccount.phone || ''}
            />
          </Grid>



          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={dataAccount.email}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              name="province"
              label="Province"
              variant="outlined"
              defaultValue=""
              id="province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              {provinces?.data?.map((province) => (
                <MenuItem key={province.province_id} value={province.province_id}>
                  {province.province}
                </MenuItem>
              ))}

            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="District/City"
              variant="outlined"
              defaultValue=""
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem value="">
                {selectedProvince ? "Select City" : "Select the province first!"}
              </MenuItem>
              {cities.map((city) => (
                    <MenuItem key={city.city_id} value={city.city_id}>
                        {city.city_name}
                    </MenuItem>
                ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              defaultValue=""
            />
          </Grid>

          {/* Alamat */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detai Alamat"
              variant="outlined"
              defaultValue="Jl. Contoh Alamat No.123"
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
            sx={{ backgroundColor: "#00A63F", textTransform: "none", color: "#fff" }}
          >
            Simpan Perubahan
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

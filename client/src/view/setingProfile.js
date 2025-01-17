import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, TextField, Grid, Paper, MenuItem, Alert, CircularProgress } from "@mui/material";
import { getProvinces, getCities } from "../api/service/rajaOngkirApi"
import { getDataAccount } from "../api/auth/dataAccount"
import Toast from "../utils/Toast";
import Dialog from "../utils/Dialog";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



export default function ProfileSettings() {
    const navigate = useNavigate();
    const { userToken } = useAuth(); 
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


    const handleBack = () => {
        navigate(-1);
    };
    // handle update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Update data profil?',
        });

        if (
            !formData.name ||
            !formData.phone ||
            !formData.gender ||
            !formData.birthday ||
            !formData.detail_address ||
            !formData.city ||
            !formData.province ||
            !formData.postal_code
        ) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (result.isConfirmed) {
            setLoading(true);
            try {
                
                const data = new FormData();

                data.append('name', formData.name);
                data.append('phone', formData.phone);
                data.append('gender', formData.gender);
                data.append('birthday', formData.birthday);
                data.append(
                    'address',
                    JSON.stringify({
                        detail_address: formData.detail_address,
                        city: formData.city,
                        province: formData.province,
                        postal_code: formData.postal_code,
                    })
                );
                data.append('profile_picture', formData.profile_picture);

                const response = await axios.put(
                    'http://localhost:5000/account/update-profile',
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${userToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Account settings updated successfully',
                    });
                    navigate(-1 , { state: { showToast: true } });
                } else {
                    setError('Failed to update account settings. Please try again!');
                }
            } catch (error) {
                if (error.response) {
                    const { data, status } = error.response;
            
                    if (status === 400) {
                        const validationErrors = data.errors.map((err) => err.msg).join(', ');
                        setError(`${validationErrors}`);
                    } 
                    else if (status >= 500) {
                        setError('Server error. Please try again later.');
                    } 
                    else {
                        setError('Failed to update account settings. Please try again.');
                    }
                } else if (error.request) {
                    setError('Network error. Please check your internet connection.');
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            
            } finally {
                setLoading(false);
            }
        }
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

    // data semua provinsi
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const data = await getProvinces(userToken);
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
                    <Button
                        component="label"
                        variant="contained"
                        sx={{ bgcolor: '#00A63F', '&:hover': { bgcolor: '#00A63F' } }}
                    >
                        Ganti Foto
                        <input
                            type="file"
                            hidden
                            onChange={handlePhotoChange}
                            accept="image/*"
                        />
                    </Button>
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
                            value={dataAccount.username}
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
                            value={formData.name}
                            onChange={handleMultipleChanges}
                            error={!dataAccount.name}
                            helperText={!dataAccount.name ? "Lengkapi nama lengkap !" : ""}
                        />
                    </Grid>

                    {/* Jenis Kelamin */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            name="gender"
                            label="Jenis Kelamin"
                            variant="outlined"
                            value={formData.gender || ""}
                            onChange={handleMultipleChanges}
                            error={!dataAccount.gender}
                            helperText={!dataAccount.gender ? "Lengkapi jenis kelamin !" : ""}
                        >
                            <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                            <MenuItem value="Perempuan">Perempuan</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="birthday"
                            label="Tanggal Lahir"
                            type="date"
                            variant="outlined"
                            value={formData.birthday ? new Date(formData.birthday).toISOString().split('T')[0] : ""}
                            onChange={handleMultipleChanges}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!dataAccount.birthday}
                            helperText={!dataAccount.birthday ? "Lengkapi tanggal lahir!" : ""}
                        />
                    </Grid>


                    {/* Nomor Telepon */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="phone"
                            label="Nomor Telepon"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleMultipleChanges}
                            error={!dataAccount.phone}
                            helperText={!dataAccount.phone ? "Lengkapi no telepon !" : ""}
                        />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={formData.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            name="province"
                            label="Ubah Provinsi"
                            variant="outlined"
                            defaultValue=""
                            id="province"
                            value={selectedProvince}
                            onChange={handleMultipleChanges}
                            error={!dataAccount.address.postal_code}
                            helperText={!dataAccount.address.postal_code ? "Lengkapi Provinsi !" : ""}
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
                            name="city"
                            label="Ubah Kab/Kota"
                            variant="outlined"
                            id="city"
                            defaultValue={formData.province}
                            value={selectedCity}
                            onChange={handleMultipleChanges}
                            error={!dataAccount.address.city}
                            helperText={!dataAccount.address.city ? "Lengkapi Kab/Kota !" : ""}
                        >
                            <MenuItem value="">
                                {selectedProvince ? "Pilih Kab/Kota" : "Silahkan pilih provinsi dahulu!"}
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
                            name="postal_code"
                            label="Kode Pos"
                            variant="outlined"
                            value={formData.postal_code || ''}
                            onChange={handleMultipleChanges}
                            error={!dataAccount?.address?.postal_code}
                            helperText={!dataAccount?.address?.postal_code ? "Lengkapi kode pos!" : ""}
                        />
                    </Grid>

                    {/* Alamat */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="detail_address"
                            label="Detail Alamat"
                            variant="outlined"
                            value={formData.detail_address || ''}
                            multiline
                            rows={3}
                            placeholder="Contoh : Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota"
                            onChange={handleMultipleChanges}
                            error={!dataAccount.address.detail_address}
                            helperText={!dataAccount.address.detail_address ? "Lengkapi detail alamat anda!" : ""}
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
                    <Button variant="outlined"  onClick={handleBack} sx={{ textTransform: "none" }}>
                        Kembali
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ backgroundColor: "#00A63F", textTransform: "none", color: "#fff" }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Simpan Perubahan'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';

const EditDataProfile = () => {
    return (
        <Box>
            <Box mb={4}>
                <h2>Edit Data Profile</h2>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Nama Lengkap"
                        variant="outlined"
                        name="namaLengkap"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Jenis Kelamin"
                        variant="outlined"
                        name="jenisKelamin"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Tanggal Lahir"
                        variant="outlined"
                        name="tanggalLahir"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="No.Hp"
                        variant="outlined"
                        name="noHp"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Alamat"
                        variant="outlined"
                        name="alamat"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditDataProfile;

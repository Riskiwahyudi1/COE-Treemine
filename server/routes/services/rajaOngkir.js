const express = require('express');
const router = express.Router();
const {  fetchProvinces, fetchCitiesByProvince, fetchSubdistrictsByCity } = require('../../controllers/service/rajaOngkir');


router.get('/provinces', fetchProvinces);
router.get('/cities', fetchCitiesByProvince);
router.get("/subdistrict", fetchSubdistrictsByCity);

module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  fetchProvinces, fetchCitiesByProvince, fetchDistrictByCity, fetchSubDistrictByDistrict, checkShippingCost, getAvailableCouriers } = require('../../controllers/service/rajaOngkir');

router.get('/provinces',authenticateToken, fetchProvinces);
router.get('/cities', authenticateToken, fetchCitiesByProvince);
router.get('/district', authenticateToken, fetchDistrictByCity);
router.get('/sub-district', authenticateToken, fetchSubDistrictByDistrict);
router.post('/couriers', authenticateToken, getAvailableCouriers);
router.get('/calculate-cost',authenticateToken, checkShippingCost);

module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  fetchProvinces, fetchCitiesByProvince, fetchDistrictByCity, fetchSubDistrictByDistrict, checkShippingCost, getAvailableCouriers } = require('../../controllers/service/rajaOngkir');

router.get('/raja-ongkir/provinces',authenticateToken, fetchProvinces);
router.get('/raja-ongkir/cities', authenticateToken, fetchCitiesByProvince);
router.get('/raja-ongkir/district', authenticateToken, fetchDistrictByCity);
router.get('/raja-ongkir/sub-district', authenticateToken, fetchSubDistrictByDistrict);
router.post('/raja-ongkir/couriers', authenticateToken, getAvailableCouriers);
router.get('/raja-ongkir/calculate-cost',authenticateToken, checkShippingCost);

module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  fetchProvinces, fetchCitiesByProvince, checkShippingCost, getAvailableCouriers } = require('../../controllers/service/rajaOngkir');

router.get('/provinces',authenticateToken, fetchProvinces);
router.get('/cities', fetchCitiesByProvince);
router.post('/couriers', authenticateToken, getAvailableCouriers);
router.get('/calculate-cost',authenticateToken, checkShippingCost);

module.exports = router;
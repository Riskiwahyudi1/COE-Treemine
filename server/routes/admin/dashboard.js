const express = require('express');
const router = express.Router();
const { showPayment, showTransaksi, getTotalDataCount } = require('../../controllers/admin/dashboardController');


router.get('/payment', showPayment)
router.get('/transaksi', showTransaksi)
router.get('/total-request-costom', getTotalDataCount)


module.exports = router;
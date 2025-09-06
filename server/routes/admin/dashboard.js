const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const { showPayment, showTransaksi, getTotalDataCount } = require('../../controllers/admin/dashboardController');


router.get('/dashboard/payment',verifyTokenAdm, showPayment)
router.get('/dashboard/transaksi',verifyTokenAdm, showTransaksi)
router.get('/dashboard/total-request-costom',verifyTokenAdm, getTotalDataCount)


module.exports = router;
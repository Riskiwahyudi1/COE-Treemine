const express = require('express');
const router = express.Router();
const { handleMidtransNotification, createPayment, continuePayment } = require('../../controllers/buyer/paymentController');

// Webhook untuk menerima notifikasi dari Midtrans
router.post('/midtrans/notification', handleMidtransNotification);
router.post('/create-payment', createPayment);
router.post('/continue-payment', continuePayment);


module.exports = router;

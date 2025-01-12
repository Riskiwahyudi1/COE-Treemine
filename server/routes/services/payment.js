const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const { handleMidtransNotification, createPayment, continuePayment } = require('../../controllers/buyer/paymentController');

// Webhook untuk menerima notifikasi dari Midtrans
router.post('/midtrans/notification', handleMidtransNotification);
router.post('/create-payment',authenticateToken, createPayment);
router.post('/continue-payment', authenticateToken, continuePayment);


module.exports = router;

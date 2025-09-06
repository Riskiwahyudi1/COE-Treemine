const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  createTransactions, showTransactionBuyer, cancelTransactionBuyer, doneTransactionBuyer } = require('../../controllers/buyer/transactionsConstroller');

router.post('/transaction', authenticateToken, createTransactions);
router.get('/transaction', authenticateToken, showTransactionBuyer);
router.put('/transaction/cancel', authenticateToken, cancelTransactionBuyer);
router.put('/transaction/done', authenticateToken, doneTransactionBuyer);

module.exports = router;
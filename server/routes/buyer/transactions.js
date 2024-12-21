const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  createTransactions, showTransactionBuyer, cancelTransactionBuyer, doneTransactionBuyer } = require('../../controllers/buyer/transactionsConstroller');

router.post('/', authenticateToken, createTransactions);
router.get('/', authenticateToken, showTransactionBuyer);
router.put('/cancel', authenticateToken, cancelTransactionBuyer);
router.put('/done', authenticateToken, doneTransactionBuyer);

module.exports = router;
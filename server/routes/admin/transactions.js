const express = require('express');
const router = express.Router();
const { showTransactionAdmin, approveTransaction, rejectTransaction, sendTransaction } = require('../../controllers/admin/transactionController');

router.get('/', showTransactionAdmin);
router.put('/approve', approveTransaction);
router.put('/reject', rejectTransaction);
router.put('/send', sendTransaction);

module.exports = router;
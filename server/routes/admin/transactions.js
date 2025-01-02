const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const { showTransactionAdmin, approveTransaction, rejectTransaction, sendTransaction } = require('../../controllers/admin/transactionController');

router.get('/', showTransactionAdmin);
router.put('/approve', verifyTokenAdm, approveTransaction);
router.put('/reject', rejectTransaction);
router.put('/send',verifyTokenAdm, sendTransaction);

module.exports = router;
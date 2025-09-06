const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const { showTransactionAdmin, approveTransaction, rejectTransaction, sendTransaction } = require('../../controllers/admin/transactionController');

router.get('/transaction',verifyTokenAdm, showTransactionAdmin);
router.put('/transaction/approve', verifyTokenAdm, approveTransaction);
router.put('/transaction/reject',verifyTokenAdm, rejectTransaction);
router.put('/transaction/send',verifyTokenAdm, sendTransaction);

module.exports = router;
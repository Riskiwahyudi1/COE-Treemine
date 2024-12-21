const express = require('express');
const router = express.Router();

const { showRequestPrototype, approvedPrototype, rejectPrototype, showWaitingPaymentPrototype, showPrototypeByProcess, showPrototypeHistory,showRequestPrototypeByParams } = require('../../controllers/admin/requestPrototypeController')

router.get('/review', showRequestPrototype );
router.get('/', showRequestPrototypeByParams );
router.get('/waiting-payment', showWaitingPaymentPrototype );
router.get('/process', showPrototypeByProcess );
router.get('/history', showPrototypeHistory );
router.put('/:id/approve', approvedPrototype );
router.put('/:id/send-process', approvedPrototype );
router.put('/:id/delivered', approvedPrototype );
router.put('/:id/reject', rejectPrototype );

module.exports = router;
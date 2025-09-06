const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const {  approvedPrototype, rejectPrototype,showRequestPrototypeByParams } = require('../../controllers/admin/requestPrototypeController')

router.put('/request-custom-prototype/:id/approve', verifyTokenAdm, approvedPrototype );
router.get('/request-custom-prototype', verifyTokenAdm, showRequestPrototypeByParams );
router.put('/request-custom-prototype/:id/approve', verifyTokenAdm, approvedPrototype );
router.put('/request-custom-prototype/:id/reject', verifyTokenAdm, rejectPrototype );

module.exports = router;
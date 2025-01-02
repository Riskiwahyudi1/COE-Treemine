const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const {  approvedPrototype, rejectPrototype,showRequestPrototypeByParams } = require('../../controllers/admin/requestPrototypeController')

router.get('/', showRequestPrototypeByParams );
router.put('/:id/approve', verifyTokenAdm, approvedPrototype );
router.put('/:id/reject', verifyTokenAdm, rejectPrototype );

module.exports = router;
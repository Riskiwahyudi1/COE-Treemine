const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")

const { approvedAssembly, rejectAssembly, showRequestAssemblyByParams } = require('../../controllers/admin/requestAssemblyController')

router.get('/', showRequestAssemblyByParams );
router.put('/:id/approve', verifyTokenAdm, approvedAssembly );
router.put('/:id/reject', verifyTokenAdm, rejectAssembly );

module.exports = router;
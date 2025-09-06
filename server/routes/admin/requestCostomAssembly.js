const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")

const { approvedAssembly, rejectAssembly, showRequestAssemblyByParams } = require('../../controllers/admin/requestAssemblyController')

router.get('/request-custom-assembly', verifyTokenAdm, showRequestAssemblyByParams );
router.put('/request-custom-assembly/:id/approve', verifyTokenAdm, approvedAssembly );
router.put('/request-custom-assembly/:id/reject', verifyTokenAdm, rejectAssembly );

module.exports = router;
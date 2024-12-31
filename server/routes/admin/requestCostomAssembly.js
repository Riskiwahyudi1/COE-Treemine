const express = require('express');
const router = express.Router();

const { approvedAssembly, rejectAssembly, showRequestAssemblyByParams } = require('../../controllers/admin/requestAssemblyController')

router.get('/', showRequestAssemblyByParams );
router.put('/:id/approve', approvedAssembly );
router.put('/:id/reject', rejectAssembly );

module.exports = router;
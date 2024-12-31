const express = require('express');
const router = express.Router();

const {  approvedPrototype, rejectPrototype,showRequestPrototypeByParams } = require('../../controllers/admin/requestPrototypeController')

router.get('/', showRequestPrototypeByParams );
router.put('/:id/approve', approvedPrototype );
router.put('/:id/reject', rejectPrototype );

module.exports = router;
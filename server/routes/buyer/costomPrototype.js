const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  showCustomPrototypeData, requestCostomPrototype, showCustomPrototypeByUser, requestPrototypeToAdmin, deleteRequestPrototype,cancelRequestPrototype, upload } = require('../../controllers/buyer/costomPrototypeController');



router.get('/', showCustomPrototypeData);
router.get('/api/transaksi', authenticateToken, showCustomPrototypeByUser);
router.post('/request-costom',authenticateToken, requestCostomPrototype);
router.put('/:id/send-review', upload.single('design_file'), requestPrototypeToAdmin);
router.delete('/:id/delete', deleteRequestPrototype);
router.put('/:id/cancel', cancelRequestPrototype );

module.exports = router;
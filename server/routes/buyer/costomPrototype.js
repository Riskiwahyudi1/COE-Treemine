const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  showCustomPrototypeData, requestCostomPrototype, showCustomPrototypeByUser, requestPrototypeToAdmin, deleteRequestPrototype,cancelRequestPrototype, upload } = require('../../controllers/buyer/costomPrototypeController');



router.get('/costom-prototype', showCustomPrototypeData);
router.get('/costom-prototype/api/transaksi', authenticateToken, showCustomPrototypeByUser);
router.post('/costom-prototype/request-costom',authenticateToken, requestCostomPrototype);
router.put('/costom-prototype/:id/send-review', authenticateToken, upload.single('design_file'), requestPrototypeToAdmin);
router.delete('/costom-prototype/:id/delete', authenticateToken, deleteRequestPrototype);
router.put('/costom-prototype/:id/cancel', authenticateToken, cancelRequestPrototype );

module.exports = router;
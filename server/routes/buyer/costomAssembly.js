const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  showCustomPrototypeData, requestCostomAssembly, showCustomAssemblyByUser, requestAssemblyToAdmin, cancelRequestAssembly ,deleteRequestAssembly, upload } = require('../../controllers/buyer/costomAssemblyController');

// router.get('/', showCustomPrototypeData);
router.get('/api/transaksi', authenticateToken, showCustomAssemblyByUser);
router.post('/request-costom',authenticateToken, requestCostomAssembly);
router.put('/:id/send-review', upload.single('design_file'), requestAssemblyToAdmin);
router.delete('/:id/delete', deleteRequestAssembly);
router.put('/:id/cancel', cancelRequestAssembly );

module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  showCustomPrototypeData, requestCostomAssembly, showCustomAssemblyByUser, requestAssemblyToAdmin, cancelRequestAssembly ,deleteRequestAssembly, upload } = require('../../controllers/buyer/costomAssemblyController');

// router.get('/', showCustomPrototypeData);
router.get('/costom-assembly/api/transaksi', authenticateToken, showCustomAssemblyByUser);
router.post('/costom-assembly/request-costom',authenticateToken, requestCostomAssembly);
router.put('/costom-assembly/:id/send-review',authenticateToken, upload.single('design_file'), requestAssemblyToAdmin);
router.delete('/costom-assembly/:id/delete',authenticateToken, deleteRequestAssembly);
router.put('/costom-assembly/:id/cancel',authenticateToken, cancelRequestAssembly );

module.exports = router;
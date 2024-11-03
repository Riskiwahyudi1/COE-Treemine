const express = require('express');
const router = express.Router();
const { addProduct, showProduct, deleteProduct, upload } = require('../../controllers/admin/standartProductController');

router.get('/', showProduct);
router.post('/', upload.single('image'), addProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

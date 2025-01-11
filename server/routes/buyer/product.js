const express = require('express');
const router = express.Router();
const {  getProductById, searchProduct, showProduct } = require('../../controllers/standartProductController');


router.get('/', showProduct);
router.get('/search', searchProduct);
router.get('/:id', getProductById);

module.exports = router;

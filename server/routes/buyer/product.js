const express = require('express');
const router = express.Router();
const {  getProductById, searchProduct, showProduct } = require('../../controllers/standartProductController');


router.get('/product', showProduct);
router.get('/product/search', searchProduct);
router.get('product/:id', getProductById);

module.exports = router;

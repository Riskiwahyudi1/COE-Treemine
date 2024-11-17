const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  addProductToCart, showCart } = require('../../controllers/buyer/cartController');


router.post('/', authenticateToken, addProductToCart);
router.get('/', authenticateToken, showCart);

module.exports = router;
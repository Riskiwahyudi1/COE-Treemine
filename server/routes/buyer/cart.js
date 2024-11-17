const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  addProductToCart, showCart, deleteProductFromCart } = require('../../controllers/buyer/cartController');


router.post('/add-product', authenticateToken, addProductToCart);
router.get('/', authenticateToken, showCart);
router.delete('/delete/:id', authenticateToken, deleteProductFromCart);

module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');
const {  addProductToCart } = require('../../controllers/buyer/cartController');


router.post('/', authenticateToken, addProductToCart);

module.exports = router;
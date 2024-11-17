const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticateToken = require('../../middlewares/authenticateToken');
const validateObjectId = require('../../middlewares/validateObjectId');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');
const {  addProductToCart, showCart, deleteProductFromCart } = require('../../controllers/buyer/cartController');

const validateAddProductToCart = [
    body('id_product')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid Product ID format'),
];

router.post('/add-product', validateAddProductToCart, handleValidationErrors, authenticateToken, addProductToCart);
router.get('/', authenticateToken, showCart);
router.delete('/delete/:id', authenticateToken, validateObjectId, deleteProductFromCart);

module.exports = router;
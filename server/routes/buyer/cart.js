const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const authenticateToken = require('../../middlewares/authenticateToken');
const validateObjectId = require('../../middlewares/validateObjectId');
const validateRequest = require('../../middlewares/handleValidationErrors');
const {  addProductToCart, showCart, deleteProductFromCart } = require('../../controllers/buyer/cartController');

router.post('/add-product', validateRequest([
    check('id_product').notEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID format'),
    ]), 
    authenticateToken,
    addProductToCart
);
router.get('/', authenticateToken, showCart);
router.delete('/delete/:id', validateRequest([
    param('id').isMongoId().withMessage('Invalid id format'),
    ]),
    authenticateToken,
    validateObjectId,
    deleteProductFromCart
);

module.exports = router;
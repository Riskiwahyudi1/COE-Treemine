const express = require('express');
const router = express.Router();
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const { body, validationResult } = require('express-validator');
const Categories = require('../../models/categories');
const { addProduct, showProduct, deleteProduct, updateProduct, getProductById ,upload, searchProduct } = require('../../controllers/standartProductController');

// validasi foto
const imageValidation = (req, res, next) => {
    if (req.method === 'POST' && !req.file) {
        return res.status(400).json({ errors: [{ msg: 'Image is required!' }] });
    }
    if (req.file) {
        const fileMime = req.file.mimetype;
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(fileMime)) {
            return res.status(400).json({ errors: [{ msg: 'Only JPEG, JPG, and PNG images are allowed!' }] });
        }
    }
    next();
};

// Validasi produk
const productValidation = [
    body('product_name')
        .trim()
        .notEmpty().withMessage('Product name must be filled in!'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description must be filled in!'),
    body('harga')
        .trim()
        .notEmpty().withMessage('Price must be filled in!')
        .isNumeric().withMessage('Price must be a number!'),
    body('stock')
        .trim()
        .notEmpty().withMessage('Stock must be filled in!')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer!'),
    body('id_category')
        .custom(async (value) => {
            const categoryExists = await Categories.findById(value);  
            if (!categoryExists) {
                throw new Error('Category does not exist');
            }
            return true;
        }),
];

// hasil validasi

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

router.get('/', showProduct);
router.get('/search', searchProduct);
router.get('/:id', getProductById);
router.post('/',verifyTokenAdm, upload.single('image'), productValidation, imageValidation, validateRequest, addProduct );
router.delete('/:id', verifyTokenAdm, deleteProduct);
router.put('/:id',verifyTokenAdm, upload.single('image'), productValidation, imageValidation, validateRequest, updateProduct);

module.exports = router;

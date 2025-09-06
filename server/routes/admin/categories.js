const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const verifyTokenAdm = require("../../middlewares/autenticateTokenAdmin")
const {
    showCategories,
    addCategories,
    upload,
    deleteCategory,
    getCategoryById,
    updateCategory,
} = require('../../controllers/admin/categoriesController');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const imageValidation = (req, res, next) => {
    if (req.method === 'POST' && !req.file) {
        return res.status(400).json({ errors: [{ msg: 'Image is required!' }] });
    }
    if (req.file) {
        const fileMime = req.file.mimetype;
        if (!['image/jpeg', 'image/png', 'image/jpeg'].includes(fileMime)) {
            return res.status(400).json({ errors: [{ msg: 'Only JPEG, JPG, and PNG images are allowed!' }] });
        }
    }
    next();
};

const validateCategory = [
    body('category_name')
        .trim()
        .notEmpty().withMessage('Category name is required.')
        .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters long.'),
];

router.get('/product/categories', showCategories);
router.get('/product/categories/:id', getCategoryById);

router.post(
    '/product/categories/add',
    verifyTokenAdm,
    upload.single('image'),
    validateCategory,
    handleValidationErrors,
    imageValidation,
    addCategories
);
router.delete('/product/categories/delete/:id', verifyTokenAdm, deleteCategory);
router.put(
    '/product/categories/edit/:id',
    verifyTokenAdm,
    upload.single('image'),
    validateCategory,
    handleValidationErrors,
    imageValidation,
    updateCategory
);

module.exports = router;

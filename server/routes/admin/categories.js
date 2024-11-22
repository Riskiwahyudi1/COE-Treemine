const express = require('express');
const router = express.Router();
const { showCategories, addCategories, upload, deleteCategory } = require('../../controllers/admin/categoriesController');

router.get('/', showCategories);
router.post('/add', upload.single('image'), addCategories );
router.delete('/delete/:id' , deleteCategory );

module.exports = router;

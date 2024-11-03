const express = require('express');
const router = express.Router();
const { showCategories } = require('../../controllers/admin/categoriesController');

router.get('/', showCategories);

module.exports = router;

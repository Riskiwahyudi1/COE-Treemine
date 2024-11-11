const express = require('express');
const router = express.Router();
const {  getProductById } = require('../../controllers/admin/standartProductController');


router.get('/:id', getProductById);

module.exports = router;
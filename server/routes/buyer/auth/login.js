const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../../../middlewares/handleValidationErrors');
const { login } = require('../../../controllers/buyer/auth/loginController');

router.post('/login/buyer', validateRequest([
    body('email')
        .isEmail()
        .withMessage('Email tidak valid.')
        .notEmpty()
        .withMessage('Email tidak boleh kosong.'),
    body('password')
        .notEmpty()
        .withMessage('Password tidak boleh kosong.'),
]),
    login);

module.exports = router;

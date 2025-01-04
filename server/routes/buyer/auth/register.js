const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const validateRequest = require('../../../middlewares/handleValidationErrors');  
const { register, verifikasiEmail } = require('../../../controllers/buyer/auth/registerController');

router.post(
  '/',
  validateRequest([
    body('username')
      .isLength({ min: 5, max: 30 })
      .withMessage('Username harus memiliki 5-30 karakter.')
      .notEmpty()
      .withMessage('Username tidak boleh kosong.'),
    body('email')
      .isEmail()
      .withMessage('Email tidak valid.')
      .notEmpty()
      .withMessage('Email tidak boleh kosong.'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password harus memiliki minimal 6 karakter.')
      .notEmpty()
      .withMessage('Password tidak boleh kosong.'),
  ]),
  register
);

router.get(
  '/verify/:token',
  validateRequest([
      check('token')
          .notEmpty()
          .withMessage('Token tidak boleh kosong.')
  ]),
  verifikasiEmail
);

  module.exports = router;
  
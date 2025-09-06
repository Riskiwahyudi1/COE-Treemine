const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authenticateToken = require('../../../middlewares/authenticateToken');
const validateRequest = require('../../../middlewares/handleValidationErrors');  
const { changePassword, forgotPassword, resetPassword } = require('../../../controllers/buyer/auth/settingPasswordController');

router.post(
  '/password/change-password',
  authenticateToken, 
  validateRequest([
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password baru harus memiliki setidaknya 6 karakter.')
  ]), 
  changePassword
);


router.post(
  '/forgot-password', 
  validateRequest([
    check('email')
      .isEmail()
      .withMessage('Masukkan email yang valid!')
  ]), 
  forgotPassword
);


router.post(
  '/reset-password/:token', 
  validateRequest([
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password harus memiliki setidaknya 6 karakter!')
  ]), 
  resetPassword
);

module.exports = router;

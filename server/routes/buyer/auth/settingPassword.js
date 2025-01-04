const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authenticateToken = require('../../../middlewares/authenticateToken');
const validateRequest = require('../../../middlewares/handleValidationErrors');  
const { changePassword } = require('../../../controllers/buyer/auth/settingPasswordController');

// Router untuk change-password dengan validasi
router.post(
  '/change-password',
  authenticateToken, 
  validateRequest([
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password baru harus memiliki setidaknya 6 karakter.')
  ]), 
  changePassword
);

module.exports = router;

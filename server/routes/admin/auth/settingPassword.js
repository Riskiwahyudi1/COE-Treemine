const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const verifyTokenAdm = require("../../../middlewares/autenticateTokenAdmin")
const validateRequest = require('../../../middlewares/handleValidationErrors');  
const { changePassword } = require('../../../controllers/admin/auth/settingPasswordController');

router.post(
  '/password/change-password',
  verifyTokenAdm, 
  validateRequest([
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password baru harus memiliki setidaknya 6 karakter.')
  ]), 
  changePassword
);


module.exports = router;

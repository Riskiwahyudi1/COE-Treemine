const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const validateRequest = require('../../../middlewares/handleValidationErrors')
const authenticateToken = require('../../../middlewares/authenticateToken');
const { updateProfile, getUserData, upload } = require('../../../controllers/buyer/accountSettingController')

router.get('/', authenticateToken, getUserData)
router.put(
    '/update-profile',
    authenticateToken, 
    upload.single('profile_picture'), 
    validateRequest([ 
      check('name')
        .notEmpty()
        .withMessage('Nama tidak boleh kosong!')
        .isLength({ min: 3 })
        .withMessage('Nama harus terdiri dari minimal 3 karakter!'),
  
      check('phone')
        .notEmpty()
        .withMessage('Nomor telepon tidak boleh kosong!')
        .isMobilePhone('id-ID')
        .withMessage('Nomor telepon tidak valid!'),
      check('gender')
        .notEmpty()
        .withMessage('Jenis kelamin tidak boleh kosong!')
        .isIn(['Laki-laki', 'Perempuan'])
        .withMessage('Jenis kelamin tidak valid!'),
  
      check('birthday')
        .notEmpty()
        .withMessage('Tanggal lahir tidak boleh kosong!')
        .isISO8601()
        .withMessage('Tanggal lahir tidak valid!'),
  
      check('address')
        .notEmpty()
        .withMessage('Alamat tidak boleh kosong!')
        .custom((value) => {
          try {
            const address = JSON.parse(value);
            if (!address.detail_address || !address.city || !address.province || !address.postal_code) {
              throw new Error('Alamat tidak lengkap!');
            }
            return true;
          } catch (err) {
            throw new Error('Format alamat tidak valid!');
          }
        }),
      check('profile_picture')
        .custom((value, { req }) => {
          if (req.file) {
            const file = req.file;
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 1 * 1024 * 1024; 
            if (!allowedTypes.includes(file.mimetype)) {
              throw new Error('Silahkan masukan foto jpeg, png, jpg !');
            }
            if (file.size > maxSize) {
              throw new Error('Size foto maksimal 1MB!');
            }
          }
          return true;
        })
    ]),
    updateProfile 
  );



module.exports = router;
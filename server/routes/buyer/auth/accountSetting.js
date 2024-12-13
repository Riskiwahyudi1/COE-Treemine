const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middlewares/authenticateToken');
const { updateProfile, getUserData, upload } = require('../../../controllers/buyer/accountSettingController')

router.get('/', authenticateToken, getUserData)
router.put('/update-profile', authenticateToken, upload.single('profile_picture'), updateProfile);



module.exports = router;
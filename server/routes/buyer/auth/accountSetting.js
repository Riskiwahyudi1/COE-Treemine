const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middlewares/authenticateToken');
const { updateProfile, getUserData } = require('../../../controllers/buyer/accountSettingController')

router.get('/', authenticateToken, getUserData)
router.put('/update-profile', authenticateToken, updateProfile)


module.exports = router;
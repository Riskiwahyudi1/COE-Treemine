const express = require("express");
const { loginRateLimiter } = require('../../../middlewares/rateLimitLogin');
const { loginAdmin } = require('../../../controllers/admin/auth/login')

const router = express.Router();

router.post('/login/protected', loginRateLimiter, loginAdmin);

module.exports = router;

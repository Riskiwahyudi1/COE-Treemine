const express = require("express");
const verifyTokenAdm = require("../../../middlewares/autenticateTokenAdmin")
const { loginAdmin } = require('../../../controllers/admin/auth/login')

const router = express.Router();

router.post('/protected', loginAdmin, verifyTokenAdm);

module.exports = router;

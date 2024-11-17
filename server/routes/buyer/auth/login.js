const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/users');
const router = express.Router();
const cors = require('cors');


const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const JWT_SECRET = process.env.JWT_SECRET; 

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // cek user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email or password incorrect!" });
        }

        // cek verifikasi email
        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your Email!" });
        }

        // cek Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email or password incorrect!" });
        }

        // JWT Token create
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, message: "Login Berhasil!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
});

module.exports = router;

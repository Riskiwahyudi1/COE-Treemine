const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/users');
const router = express.Router();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: {
        message: "Terlalu banyak percobaan login. Silakan coba lagi setelah 15 menit.",
    },
    standardHeaders: true, 
    legacyHeaders: false,  
});

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const JWT_SECRET = process.env.JWT_SECRET; 

router.post('/', loginRateLimiter, async (req, res) => {
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
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        
        // Kirim respons sukses dengan token
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
            message: "Login berhasil!",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
});

module.exports = router;

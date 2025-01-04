const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../../models/users');
const transporter = require('../../../config/nodemailer');
const router = express.Router();
const Joi = require('joi');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const existingUser = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }]
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }

        const newUser = await User.create({ username, email, password });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        const verificationUrl = `http://localhost:5000/register/buyer/verify/${token}`;

        await transporter.sendMail({
            from: '"COE Treemine" riskiwahyudi@gmail.com',
            to: newUser.email,
            subject: 'Verifikasi Alamat Email Anda',
            html: `
          <p>Halo ${newUser.username},</p>
          <p>Terima kasih telah mendaftar di <strong>COE Treemine</strong>. Mohon verifikasi alamat email Anda untuk mengaktifkan akun:</p>
          <p><a href="${verificationUrl}" style="color: #1a73e8;">Klik di sini untuk verifikasi email Anda</a></p>
          <p>Tautan ini akan kedaluwarsa dalam waktu 1 jam.</p>
          <p>Jika Anda tidak membuat akun ini, harap abaikan email ini.</p>
          <br>
          <p>Salam hangat,</p>
          <p>Tim COE Treemine</p>
        `,
        });


        res.status(201).json({ message: 'User berhasil disimpan', user: newUser });

    } catch (error) {
        console.error('Gagal menyimpan data:', error.message);
        res.status(500).json({ message: 'Gagal menyimpan data', error: error.message });
    }
}

const verifikasiEmail = async (req, res) => {

    const { token } = req.params;

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        const linkLogin = 'http://localhost:3000/login';

        await User.findByIdAndUpdate(decoded.id, { isVerified: true });
        res.send(`<h1>Email verified successfully!, please login to your account <a href="${linkLogin}">here!</a></h1>`);
    } catch (error) {
        console.error(error);
        res.status(400).send('<h1>Invalid or expired token!</h1>');
    }
}

module.exports = {
    register,
    verifikasiEmail
}
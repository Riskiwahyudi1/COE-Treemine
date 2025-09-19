const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../../models/users');
const transporter = require('../../../config/nodemailer');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            if (existingUser.isVerified) {
                // sudah terdaftar dan terverifikasi
                return res.status(409).json({ message: 'Email atau username sudah terdaftar' });
            } else {
                // user ada tapi belum verifikasi
                const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const verificationUrl = `https://treemine.polibatam.ac.id/api/register/buyer/verify/${token}`;

                await transporter.sendMail({
                    from: `"Official CoE" <${process.env.EMAIL_USER}>`,
                    to: existingUser.email,
                    subject: 'Verifikasi Alamat Email Anda',
                    html: `
                      <p>Halo ${existingUser.username},</p>
                      <p>Akun Anda sudah terdaftar tetapi belum terverifikasi. Klik tautan berikut untuk memverifikasi akun:</p>
                      <p><a href="${verificationUrl}" style="color: #1a73e8;">Verifikasi akun Anda</a></p>
                      <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
                      <br>
                      <p>Salam hangat,</p>
                      <p>Tim COE Treemine</p>
                    `,
                });

                return res.status(201).json({ message: 'Email verifikasi baru telah dikirim ulang' });
            }
        }

        // buat user baru
        const newUser = await User.create({ username, email, password });

        // buat token verifikasi
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        // const verificationUrl = `http://localhost:5000/api/register/buyer/verify/${token}`;
        const verificationUrl = `https://treemine.polibatam.ac.id/api/register/buyer/verify/${token}`;

        // kirim email verifikasi
        await transporter.sendMail({
            from: `"Official CoE" <${process.env.EMAIL_USER}>`,  
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

        res.status(201).json({ message: 'User berhasil disimpan, email verifikasi terkirim', user: newUser });

    } catch (error) {
        console.error('Gagal menyimpan data:', error.message);
        res.status(500).json({ message: 'Gagal menyimpan data', error: error.message });
    }
};

const verifikasiEmail = async (req, res) => {

    const { token } = req.params;

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        const linkLogin = 'https://treemine.polibatam.ac.id/login';
        // const linkLogin = 'http://localhost:3000/login';

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
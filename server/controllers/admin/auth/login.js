const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/users'); // Sesuaikan dengan lokasi model User Anda

// Fungsi untuk menghasilkan JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token kedaluwarsa dalam 1 jam
    });
};

// Controller untuk login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {

        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Email atau Password salah!' });

        const token = generateToken(user);

        res.cookie('adminToken', token, {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000,
            secure: false,
        });
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginAdmin };
const jwt = require('jsonwebtoken');

const verifyTokenAdm = (req, res, next) => {
    try {
        // Ambil token dari cookie
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token tidak ditemukan' });
        }

        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Anda bukan admin' });
        }

        req.user = decoded; // Simpan informasi user ke dalam req untuk digunakan di controller
        next(); // Lanjutkan ke handler berikutnya
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Token tidak valid' });
    }
};

module.exports = verifyTokenAdm;

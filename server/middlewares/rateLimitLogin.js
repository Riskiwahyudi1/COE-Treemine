const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 5, // Maksimal 5 percobaan per IP
    standardHeaders: true, // Tampilkan info limit di header standar
    legacyHeaders: false,  // Matikan header lama
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Terlalu banyak percobaan login. Silakan coba lagi setelah 15 menit."
        });
    }
});

module.exports = { loginRateLimiter };

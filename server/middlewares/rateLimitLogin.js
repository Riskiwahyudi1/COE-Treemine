const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req, res) => {
        const ip = req.ip || req.connection.remoteAddress;
        const email = req.body.email || "unknown";
        return `${ip}-${email}`;
    },
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Terlalu banyak percobaan login. Silakan coba lagi setelah 15 menit."
        });
    }
});

module.exports = { loginRateLimiter };

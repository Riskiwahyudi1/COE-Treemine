const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log("Token not provided in header");
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Unauthorized: Token expired',
                redirect: '/login',
                role: 'user'
            });
        }
        
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Unauthorized: Token tidak valid' });
    
    }
}

module.exports = authenticateToken;

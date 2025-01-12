const jwt = require('jsonwebtoken');

const verifyTokenAdm = (req, res, next) => {
    try {
        let token = req.cookies.adminToken || req.headers['authorization'];

        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length); 
        }
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token tidak ditemukan' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Anda bukan admin' });
        }

        req.user = decoded;
        
        next();
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Unauthorized: Token expired',
                redirect: '/login',
                role: 'admin'
            });
        }
        
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Unauthorized: Token tidak valid' });
    }
};

module.exports = verifyTokenAdm;

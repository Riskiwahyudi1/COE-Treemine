const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Invalid Token "});
    };

    try{

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();

    }catch (error){
        res.status(403).json({message:"token tidak valid atau kadarluarsa!"});
    }
}

module.exports = authenticateToken;
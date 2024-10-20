
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET; 


router.get('/:token', async (req, res) => {
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
});

module.exports = router;

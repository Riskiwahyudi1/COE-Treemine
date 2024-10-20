const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken'); 

router.get('/', authenticateToken, (req, res) => {
    res.json({ 
        message: 'Welcome to Dashboard', 
        userId: req.user.id 
    });
});

module.exports = router;
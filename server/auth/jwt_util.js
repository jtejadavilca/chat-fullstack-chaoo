const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (user) => {
    const token = jwt.sign({
        userId: user._id,
        name: user.name,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        //expiresIn: '30d'
        expiresIn: '1m'
    });
    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (error, decoded) => {
        
        if (error) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, verifyToken };
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(403).json({ message: 'Token not provided' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err){
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user
        next();
    });
}

const verifyAdmin = (req, res, next) => { 
    verifyToken(req, res, () => {
        if(!req.user.isAdmin){
            return res.status(403).json({ message: 'You are not authorized!' });
        }
        next(); 
    });
}

module.exports = { verifyAdmin, verifyToken }
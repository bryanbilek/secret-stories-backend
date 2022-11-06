const jwt = require('jsonwebtoken');

//check via token if authorized to view the route
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || `If I told you the secret it isn't a secret`;
    if (token) {
        jwt.verify(token, secret, err => {
            if(err){
                res.status(401).json(err.message);
            } else {
                next()
            }
        })
    } else {
        res.status(401).json('Authorization token required');
    }
};
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('X-auth-token');

    //If there is no token, return error
    if(!token) {
        return res.status(401).json({ msg: 'Access denied' });
    }

    try {
        //If there is a token, verify the token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        //If there is a token but it isn't valid, send error
        res.status(401).json({ msg: 'Invalid token' });
    }   
}

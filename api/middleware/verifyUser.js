module.exports = function (req, res, next) {
    
    try {
        req.user.id = '5ecc86d50f1e1546a98f086e';
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Invalid' });
    }   
}
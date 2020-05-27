module.exports = function (req, res, next) {
    //Get token from header
    const userId = req.header('userId');
    console.log(userId);
    //If there is no userId, return error
    if(!userId) {
        return res.status(401).json({ msg: 'Access denied' });
    }
    try {
        //If there is a userId, set that as req.user.id
        req.user.id = userId;
        next();
    } catch(err) {
        //If there is a userId but it isn't valid, send error
        res.status(401).json({ msg: 'Invalid' });
    }   
}
const passport = require('passport');
require('../../passportConfig')(passport);

function logOut(req, res){
    if (req.user) {
        req.logout();
        res.json({success: true, message: 'Logged User Out', info: ''})
    } else {
        res.status(400).json({success: false, message: 'User not logged in', info: ''})
    }
};

module.exports = logOut;



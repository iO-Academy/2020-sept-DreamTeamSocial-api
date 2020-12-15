const User = require('../../models/user.js');
const getDbConnection = require("../../dbConnection");

async function getUserInfo(req, res) {
    getDbConnection();
    User.findOne({username: req.params.user}, (err, user) => {
        if (err) {
            return res.status(500).json({success: false, message: 'error', info: ''});
        } else {
            return res.json({success: true, message: 'got user info', info: {username: user.username,  bio: user.bio || ''}});
        }
    } )

}

module.exports = getUserInfo;
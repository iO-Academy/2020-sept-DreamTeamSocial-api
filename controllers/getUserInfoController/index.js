const User = require('../../models/user.js');
const getDbConnection = require("../../dbConnection");

async function getUserInfo(req, res) {
    if (req.user) {
        getDbConnection();
        User.findOne({username: req.params.user}, (err, user) => {
            if (err) {
                return res.status(500).json({success: false, message: 'error', info: ''});
            } else {
                return res.json({
                    success: true,
                    message: 'got user info',
                    info: {username: user.username, bio: user.bio || '', following: user.following || []}
                });
            }
        })
    } else {
        return res.status(400).json({success: false, message: 'user not logged in', info: ''});
    }
}

module.exports = getUserInfo;
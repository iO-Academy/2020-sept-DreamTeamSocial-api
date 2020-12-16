const Til = require('../../models/til.js');
const User = require('../../models/user');
const getDbConnection = require("../../dbConnection");

async function getAllFollowingTils(req, res) {
    if (req.user) {
        getDbConnection();
        User.find( {username: req.user.username}, (err, user) => {
            if (err) {
                return res.status(500).json({success: false, message: 'error', info: ''});
            } else {
                Til.find( {username: {$in :user[0].following}}, (err, tils) => {
                    if (err) {
                        return res.status(500).json({success: false, message: 'error', info: ''});
                    } else {
                        return res.json({success: true, message: 'got til info', info: tils});
                    }
                });
            }
        });
    } else {
        return res.status(400).json({success: false, message: 'user not logged in', info: ''});
    }
}

module.exports = getAllFollowingTils;
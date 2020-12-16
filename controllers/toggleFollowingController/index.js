const User = require('../../models/user.js');
const getDbConnection = require("../../dbConnection");

async function toggleFollowing(req, res) {
    if (req.user) {
        getDbConnection();
        User.find({username: req.params.user}, async (err, user) => {
            if (err) {
                return res.status(500).json({success: false, message: 'error', info: ''});
            } else {
                console.log(user[0])
                const following = user[0].following;
                if (following.includes(req.query.user2)) {
                    User.updateOne({username: req.params.user}, {"$pullAll": {"following": [req.query.user2]}}, async (err, user) => {
                        if (err) {
                            return res.status(500).json({success: false, message: 'error', info: ''});
                        } else {
                            return res.json({success: true, message: 'removed from following list', info: ''});
                        }
                    });
                } else {
                    User.updateOne({username: req.params.user}, {"$push": {"following": req.query.user2}}, async (err, user) => {
                        if (err) {
                            return res.status(500).json({success: false, message: 'error', info: ''});
                        } else {
                            return res.json({success: true, message: 'added to following list', info: ''});
                        }
                    });
                }
            }
        });
    } else {
        return res.status(400).json({success: false, message: 'user not logged in', info: ''});
    }
}

module.exports = toggleFollowing;
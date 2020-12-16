const Til = require('../../models/til.js');
const getDbConnection = require("../../dbConnection");

async function addNewTil(req, res) {
    if (req.user) {
        getDbConnection();
        Til.create({username: req.body.username, tilPost: req.body.tilPost}, async (err, Til) => {
            if (err) {
                return res.status(500).json({success: false, message: 'error', info: ''});
            } else {
                return res.json({success: true, message: 'got til post info', info: ''});
            }
        });
    } else {
        return res.status(400).json({success: false, message: 'user not logged in', info: ''});
    }
}

module.exports = addNewTil;
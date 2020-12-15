const Til = require('../../models/til.js');
const getDbConnection = require("../../dbConnection");

async function getTils(req, res) {
    getDbConnection();
    Til.find({username: req.params.user}, (err, tils) => {
        if (err) {
            return res.status(500).json({success: false, message: 'error', info: ''});
        } else {
            return res.json({success: true, message: 'got til info', info: tils});
        }
    });

}

module.exports = getTils;
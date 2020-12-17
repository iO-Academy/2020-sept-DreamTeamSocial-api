const Til = require('../../models/til.js');
const getDbConnection = require("../../dbConnection");
const mongoose = require('mongoose');

async function getTils(req, res) {
    if (req.user) {
        getDbConnection();
        const query = mongoose.Types.ObjectId(req.query.id);
        if (query) {
            Til.find({username: req.params.user, _id: query}, (err, tils) => {
                if (err) {
                    return res.status(500).json({success: false, message: 'error', info: ''});
                } else {
                    return res.json({success: true, message: 'got til info', info: tils});
                }
            });
        } else {
            Til.find({username: req.params.user}, (err, tils) => {
                if (err) {
                    return res.status(500).json({success: false, message: 'error', info: ''});
                } else {
                    return res.json({success: true, message: 'got til info', info: tils});
                }
            });
        }
    } else {
        return res.status(400).json({success: false, message: 'user not logged in', info: ''});
    }
}

module.exports = getTils;
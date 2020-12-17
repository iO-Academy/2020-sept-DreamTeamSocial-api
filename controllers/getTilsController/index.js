const Til = require('../../models/til.js');
const getDbConnection = require("../../dbConnection");
const mongoose = require('mongoose');

async function getTils(req, res) {
    if (req.user) {
        getDbConnection();
        let query = req.query.id;
        if (query) {
            try {
                query = mongoose.Types.ObjectId(query);
            } catch {
                return res.status(400).json({success: false, message: 'Til does not exist', info: ''});
            }
            Til.find({_id: query}, (err, tils) => {
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
                }
                if (!tils) {
                    return res.status(500).json({success: false, message: 'User does not exist', info: ''});
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
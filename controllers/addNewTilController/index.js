const Til = require('../../models/til.js');
const getDbConnection = require("../../dbConnection");

async function addNewTil(req, res) {
    getDbConnection();
    // const Til = new Til;
    Til.create({username: req.body.username, tilPost: req.body.tilPost}, async (err, Til) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json({success: true, message: 'got til post info', info: ''});
        }
    });
}

module.exports = addNewTil;
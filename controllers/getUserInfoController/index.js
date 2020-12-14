const User = require('./models/user');
const getDbConnection = require("../../dbConnection");

async function getUserInfo(req, res) {
    const connection = await getDbConnection();
    const db = connection.db('Users');
    let user = User.findOne({username: req.name})
    console.log(user);
}

module.exports = getUserInfo;
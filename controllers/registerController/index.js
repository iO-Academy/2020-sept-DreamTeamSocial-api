const passport = require('passport');
require('../../passportConfig')(passport);
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

function register(req, res) {
    //Validate the request here before running query of DB
    User.findOne({username: req.body.username}, async (err,document) => {
        if(document) res.send("User Exists");
        if(!document) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email || '',
                bio: req.body.bio || ''
            })
            await newUser.save();
            res.send("User Created");
        }
    })
};

module.exports = register;

const passport = require('passport');
require('../../passportConfig')(passport);
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const getDbConnection = require("../../dbConnection");

function register(req, res) {
    getDbConnection();
    //Validate the request here before running query of DB
    User.findOne({username: req.body.username}, async (err,document) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: 'Database Failure',
                info: ''
            });
        }
        if(document) {
            res.status(400).json({
                success: false,
                message: 'User Exists',
                info: ''
            });
        }
        if(!document) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            try {
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    email: req.body.email || '',
                    bio: req.body.bio || ''
                })
                await newUser.save();
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Database Failure',
                    info: ''
                });
            }
            res.json({
                success: true,
                message: 'User Created',
                info: ''
            })
        }
    })
};

module.exports = register;

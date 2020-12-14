const passport = require('passport');
require('../../passportConfig')(passport);
const getDbConnection = require("../../dbConnection");

function login(req, res, next) {
    getDbConnection();
    passport.authenticate('local', (err,user,info) => {
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Ooops something happened',
                info: ''
            })
        }
        if(!user) {
            return res.json({
                success: false,
                message: "No User exists",
                info: ''
            });
        }

        //persistent login
        req.logIn(user, err => {
            if(err) {
                return res.status(400).json({
                    success: false,
                    message: 'Ooops something happened',
                    info: ''
                });
            }
            return res.json({
                success: true,
                message: 'User Authenticated',
                info: {username: user.username, email: user.email || '', bio: user.bio || '', isAuthenticated: true}
            });
        })
    })(req,res,next);
};

module.exports = login;

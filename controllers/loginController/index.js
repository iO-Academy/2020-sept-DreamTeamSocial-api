const passport = require('passport');
require('../../passportConfig')(passport);
const getDbConnection = require("../../dbConnection");

function login(req, res, next) {
    getDbConnection();
    passport.authenticate('local', (err,user,info) => {
        if(err) {
            return res.json({
                success: false,
                message: 'Database failure',
                info: ''
            })
        }
        if(!user) {
            return res.json({
                success: false,
                message: "Username or Password is incorrect.",
                info: ''
            });
        }

        //persistent login creates a session on the users device
        req.logIn(user, err => {
            if(err) {
                return res.json({
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

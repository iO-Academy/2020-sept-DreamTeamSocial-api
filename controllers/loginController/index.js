const passport = require('passport');
require('../../passportConfig')(passport);

function login(req, res, next) {
    //'local' just point the authenticate function at our local method
    passport.authenticate('local', (err,user,info) => {
        if(err) {
            return res.status(500).json({
                message: 'Ooops something happend'
            })
        }
        if(!user) {
            return res.json({
                message: "No User exists"
            });
        }
        //persistent login
        req.logIn(user, err => {
            if(err) {
                return res.status(500).json({
                    message: 'Ooops something happend'
                });
            }
            return res.json({username: user.username, email: user.email || '', bio: user.bio || '', isAuthenticated: true});
        })
    })(req,res,next);
    //Don't really get what the next function thing does, but you need it to make it work
};

module.exports = login;

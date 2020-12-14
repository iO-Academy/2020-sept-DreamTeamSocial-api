const User = require('./models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const getDbConnection = require('./dbConnection/');

//This defines our local strategy for authenticating users
module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            getDbConnection();
            User.findOne({username: username}, (err,user) => {
                if(err) throw err;
                //these messages aren't returning so something is missing. Think it's flash error.
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result) {
                        return done(null, user);
                    } else {
                        //these messages aren't returning so something is missing. Think it's flash error.
                        return done(null, false);
                    }
                });
            });
        })
    )
    //Takes the id of the user and serialises, stores it as a cookie on the user device
    passport.serializeUser((user,cb) => {
        cb(null, user.id);
    })

    //ANY HTTP REQUEST FIRST GOES THROUGH THIS TO SEE IF THE IT CAN IDENTIFY THE COOKIE
    //It also makes the logged in user available in any request object using req.user
    passport.deserializeUser((id,cb) => {
        User.findOne({_id: id}, (err, user) => {
            const userInformation = {
                username: user.username,
            };
            cb(err, userInformation);
        })
    })
}
const passport = require('passport');
require('../../passportConfig')(passport);

function logOut(req, res){
    //Send a response to the front end to clear local storage and redirect to login page.
    req.logout();
};

module.exports = logOut;



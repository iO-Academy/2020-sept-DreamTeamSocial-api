const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

//Runs express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000", // change to location of react app
    credentials: true
}))

app.use(session({
    secret: "secretcode", //needs to match in cookie parser
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser("secretcode")) //needs to match session secret

app.use(passport.initialize());
app.use(passport.session());


//Routes
require('./passportConfig')(passport);
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const getUserInfoController = require("./controllers/getUserInfoController");
const getLoggedInController = require("./controllers/getLoggedInController");


app.post("/user", registerController);
app.post("/user/login", loginController);
app.get("/user/loggedIn", getLoggedInController);


app.get("/user/:user", getUserInfoController);



//Start Server
app.listen(3001, () => {
    console.log('Server running')
})

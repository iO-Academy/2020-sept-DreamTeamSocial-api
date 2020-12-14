const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

try {
    //Read this about mongoose.
    // https://stackoverflow.com/questions/28829912/mongoose-schema-set-max-length-for-a-string
    //This connects to local DB
    mongoose.connect('mongodb://root:password@localhost:27017/Social?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
        //This connects to a mongo atlas cloud server, we can use this if i authenticate all url access
        // mongoose.connect('mongodb+srv://joshfield:password@cluster0.r8uyl.mongodb.net/Social?retryWrites=true&w=majority',
        {
            //Don't know what these mean but the docs says you need them
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("Mongoose Connected");
        }
    );
} catch (error) {
    console.log(error);
}

//Routes
require('./passportConfig')(passport);
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
app.post("/user", registerController);
app.post("/user/login", loginController);


app.get("/getUser", ((req, res) => {
    //req.user contains the username of the currently logged in user.
    res.send(req.user);
}));



//Start Server
app.listen(3001, () => {
    console.log('Server running')
})

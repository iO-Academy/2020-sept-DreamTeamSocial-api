const mongoose = require('mongoose');

function getDbConnection() {
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
}

module.exports = getDbConnection;
const mongoose = require('mongoose').set('debug', true);

function getDbConnection() {
    try {
        //This connects to local DB
        mongoose.connect('mongodb://root:password@localhost:27017/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'Social'
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
//This file creates a schema for the data
//We can add more properties to the schema
//This means the properties will always exist on the document but may be empty

const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    bio: String
});
//"users" is what's pointing this model at the users collection.
module.exports = mongoose.model("users", User);
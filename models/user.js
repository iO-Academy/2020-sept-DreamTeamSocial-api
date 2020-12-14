const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255
    },
    password: String,
    email: {
        type: String,
        required: true,
        maxLength: 255
    },
    bio: {
        type: String,
        required: false,
        maxLength: 500
    }
});

module.exports = mongoose.model("users", User, 'users');
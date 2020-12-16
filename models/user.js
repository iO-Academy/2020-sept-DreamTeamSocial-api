const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 8,
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 8,
    },
    email: {
        type: String,
        required: true,
        maxLength: 255
    },
    bio: {
        type: String,
        required: false,
        maxLength: 500
    },
    following: {
        type: Array,
        required: true,
        default: ""
    }
});

module.exports = mongoose.model("users", User, 'users');


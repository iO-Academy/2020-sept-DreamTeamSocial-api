const mongoose = require('mongoose');

const Til = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    tilPost: {
        type: String,
        required: true,
        maxLength: 255
    }
}, {timestamps: true});

module.exports = mongoose.model("tils", Til, "tils");

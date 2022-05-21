const mongoose = require("mongoose");

const user = mongoose.model("user", {
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    accNum: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    transactions: {
        type: {
            type: String,
            trim: true,
            default: false
        },
        value: {
            type: Number,
            default: false,
        },
    },
});

module.exports = user;

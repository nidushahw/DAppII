const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    walletAddress: {
        type: String,
        required: true,
        min: 6
    },
    userType: String,
    coinBalance: { type: Number, default: 0 }
})

module.exports = mongoose.model('User', userSchema);
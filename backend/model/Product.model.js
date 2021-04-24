const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    isRedeemed: {type: Boolean, default: false},
    noOfCoins: {
        type: Number,
        required: true
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    redeemedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    redeemedDate: { type: Date }
})

module.exports = mongoose.model('Product', productSchema);
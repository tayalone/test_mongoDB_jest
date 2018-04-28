const mongoose = require('mongoose')
const Schema = mongoose.Schema

const priceHistorySchema = new Schema({
    itemID: {type: mongoose.Schema.Types.ObjectId, ref: "item"},
    price: {type:Number, min:0, default:0},
    created: { type: Date, default: Date.now }
})

const PriceHistory = mongoose.model('price_history',priceHistorySchema)

module.exports = PriceHistory

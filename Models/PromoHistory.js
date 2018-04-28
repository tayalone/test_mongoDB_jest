const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promoHistorySchema = new Schema({
    itemID: {type: mongoose.Schema.Types.ObjectId, ref: "item"},
    promoID: {type: mongoose.Schema.Types.ObjectId, ref: "promotion"},
    created: { type: Date, default: Date.now }
})

const PromoHistory = mongoose.model('promo_history',promoHistorySchema)

module.exports = PromoHistory
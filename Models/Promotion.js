const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotionSchema = new Schema({
    type: {
        type: String,
        enum: ["percent", "static"]    
    },
    name: {type: String, default: ""},
    sale: {type: Number, min: 0},
    created: { type: Date, default: Date.now },
    expired: { type: Date, default: Date.now },
    active: {type: Boolean, default: false}
})

const Promotion = mongoose.model('promo_code',promotionSchema)

module.exports = Promotion



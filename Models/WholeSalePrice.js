const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wholeSalePriceTypeSchema = new Schema({
    type: {
        type: String,
        enum: ["between", "gte"]    
    },
    startQuantity: { type: Number, min: 0, default: 0},
    endQuantity: { type: Number, min: 0, default: 0},
    price: {type:Number, min:0, default:0},
    created: { type: Date, default: Date.now }
})

const WholeSalePrice = mongoose.model('whole_sale_price',wholeSalePriceTypeSchema)

module.exports = WholeSalePrice
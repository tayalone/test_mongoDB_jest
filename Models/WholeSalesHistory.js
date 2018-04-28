const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wholeSaleHistorySchema = new Schema({
    itemDomainID: {type: mongoose.Schema.Types.ObjectId, ref: "item_domain"},
    wholeSaleID: {type: mongoose.Schema.Types.ObjectId, ref: "whole_sale_price"},
    price: {type:Number, min:0, default:0},
    created: { type: Date, default: Date.now }
})

const WholeSaleHistory = mongoose.model('wholesale_history',wholeSaleHistorySchema)

module.exports = WholeSaleHistory
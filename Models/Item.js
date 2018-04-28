const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stocksSchema = new Schema({
    _id: false,
    lotID: {type: Schema.Types.ObjectId, ref: "lot"},
    totalQuantity: {type: Number, min: 0, default: 0},
    watchQuantity: {type: Number, min: 0, default: 0},
    price: {type: Number, min: 0, default: 0},
    transportCost: {type: Number, min: 0, default: 0},
    created: { type: Date, default: Date.now } 
})

const itemSchema = new Schema({
    thName: {
        type: String, required: true
    },
    enName: {
        type: String, required: true
    },
    price: {
        type: Number, min: 0, default: 0
    },
    itemDomainID: {
        type: Schema.Types.ObjectId,
        ref: "item_domain"
    },
    allQuantity: {
        type: Number, min: 0, default: 0
    },
    quantity: {
        stock: {
            type: Number, min: 0, default: 0
        },
        shoppee: {
            type: Number, min: 0, default: 0
        }
    },
    stocks: [stocksSchema],
    orders: [{type: Schema.Types.ObjectId, ref: "order"}],
    promoCode: {type: Schema.Types.ObjectId, ref: "promo_code"},
    created: { type: Date, default: Date.now }
})

const Item = mongoose.model('item',itemSchema)

module.exports = Item
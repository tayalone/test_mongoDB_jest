const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemOrders = new Schema({
    _id: false,
    itemID : {type: Schema.Types.ObjectId, ref:"lot"},
    lotID: {type: Schema.Types.ObjectId, ref:"lot"},
    quantity: {type: Number,min:0, default:0},
    price: {type: Number,min:0, default:0},
    buyingPrice : {type: Number,min:0, default:0},
    transportPrice: {type: Number,min:0, default:0},
    promoCode: {type: Schema.Types.ObjectId, ref: "promo_code"},
    created: { type: Date, default: Date.now }
})

const orderTypeSchema = new Schema({
    orderType: {
        type : String,
        enum: ["stock","shoppee"],
    },
    userID: {type: Schema.Types.ObjectId, ref:"user"},
    items:[itemOrders],
    postPriceID: {type: Schema.Types.ObjectId, ref:"post_price"},
    tracking: {type: String, default: ""},
    created: { type: Date, default: Date.now },
    address: {type: String, default: "null"},
    orderStatus: {
        type: String,
        enum: ["ordered","success"],
        default: "ordered"
    }
})

const Order = mongoose.model('order',orderTypeSchema)

module.exports = Order
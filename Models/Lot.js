const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    _id: false,
    itemID: { type: Schema.Types.ObjectId, ref: 'item' },
    price: {type: Number, min:0, default:0 },
    quantity: {type: Number, min:0, default:0 },
    created: { type: Date, default: Date.now }
})

const lotSchema = new Schema({
    name: { type: String, require: true },
    shippingName: { type: String, required: true},
    shippingTracking: { type: String,required: true },
    costAll: { type: Number,min: 0,default:0 },
    transpotCostCn_Th: { type: Number,min: 0,default:0 },
    transpotCostTh_Th: { type: Number,min: 0,default:0 },
    allQuantity: { type: Number,min: 0, default:0 },
    costPerItem: { type: Number,min: 0,default:0 },
    items: [itemSchema],
    created: { type: Date, default: Date.now }
})

const Lot = mongoose.model('lot',lotSchema)

module.exports = Lot



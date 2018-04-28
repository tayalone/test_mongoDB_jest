const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemDomainSchema = new Schema({
    itemID: {
        type: String,
        required: true
    },
    name:{
        type: String,
        require: true
    },
    itemTypeID: {
        type: Schema.Types.ObjectId,
        ref: 'item_type'
    },
    items:[{type: Schema.Types.ObjectId, ref: 'item'}],
    gallerys: [{type: String}],
    haveWholeSalesPrice: {
        type: Boolean,
        default: false
    },
    wholeSalePrices:[{type: Schema.Types.ObjectId, ref: 'whole_sale_price'}],
    created: { type: Date, default: Date.now }
})

const ItemDomain = mongoose.model('item_domain',itemDomainSchema)

module.exports = ItemDomain



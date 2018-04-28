const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postPriceTypeSchema = new Schema({
    engName: {
        type: String,
        required: true
    },
    thName: {
        type: String,
        required: true
    },
    startPrice: { type: Number,min: 0,default: 0 },
    perPrice: { type: Number,min: 0,default: 0 },
    created: { type: Date, default: Date.now }
})

const PostPrice = mongoose.model('post_price',postPriceTypeSchema)

module.exports = PostPrice



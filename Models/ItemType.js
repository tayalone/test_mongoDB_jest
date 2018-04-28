const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemTypeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    engName: {
        type: String,
        required: true
    },
    thName: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    created: { type: Date, default: Date.now }
})

const ItemType = mongoose.model('item_type',itemTypeSchema)

module.exports = ItemType



const config = require('../../Config/config')
const mongoose = require('mongoose')
const ItemType = require('../../Models/ItemType')
const ItemDomain = require('../../Models/ItemDomain')
const Item = require('../../Models/Item')
const Lot = require('../../Models/Lot')
const PostPrice = require('../../Models/PostPrice')
const MockData = require('./MockData/5_PostPrice/data')
const itemTypeData = MockData.itemType
const itemDomainData = MockData.itemDomain
const itemData = MockData.item
const lotData = MockData.lot

beforeAll((done) => {
    mongoose.Promise = global.Promise 
    mongoose.connect(config.MONGO_URI, (err) => {
        if (err) { console.log("Connection Errors : ",err) 
            done()    
        }
        else { done() }
    },10000)
})

afterAll( (done) => {
    mongoose.disconnect()
     done()
 })

describe("PostPrice Model ...", () => {
    beforeAll((done) => {
        mongoose.connection.db.dropDatabase()
            .then(() => {
                return ItemType.collection.insertMany(itemTypeData)
            })
            .then((respond) => {
                return ItemDomain.collection.insertMany(itemDomainData)
            })
            .then((respond) => {
                return Item.collection.insertMany(itemData)
            })
            .then((respond) => {
                return Lot.collection.insertMany(lotData)
            })
            .then((respond) => {
                done()
            })
            .catch((err) => {
                console.log(err)
                done()
            })
    },60000)
    describe("Ems PostPrice :",() => {
        test("Add Ems PostPrice", (done) => {
            const newPostPrice = new PostPrice({
                engName: "EMS",
                thName: "ด่วนพิเศษ",
                startPrice: 50,
                perPrice: 10
            })
            newPostPrice.save()
                .then((savedPostPrice) => {
                    expect(savedPostPrice.engName).toEqual("EMS")
                    expect(savedPostPrice.startPrice).toEqual(50)
                    done()
                })
        })
    })
    describe("Reg PostPrice :",() => {
        test("Add Reg PostPrice", (done) => {
            const newPostPrice = new PostPrice({
                engName: "Register",
                thName: "ลงทะเบียน",
                startPrice: 40,
                perPrice: 10
            })
            newPostPrice.save()
                .then((savedPostPrice) => {
                    expect(savedPostPrice.engName).toEqual("Register")
                    expect(savedPostPrice.startPrice).toEqual(40)
                    done()
                })
        })
    })
    
},60000)
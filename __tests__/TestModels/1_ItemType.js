const config = require('../../Config/config')
const mongoose = require('mongoose')
const ItemType = require('../../Models/ItemType')
beforeAll((done) => {
    mongoose.Promise = global.Promise 
    mongoose.connect(config.MONGO_URI, (err) => {
        if (err) { console.log("Connection Errors : ",err) 
            done()    
        }
        else { done() }
    },10000)
})
afterAll((done) => {
   mongoose.disconnect()
    done()
})

describe("Test: ItemType Models ...",() => {
    let fristTypeID = ""
    beforeAll((done) => {
        mongoose.connection.db.dropDatabase()
            .then(() => {
                done()
            })
            .catch((err) => {
                console.log(err)
            })
    })
    describe("First Type",() => {
        test("Insert Shirt Type", (done) => {
            //console.log("test: one plus one equal two")
            const newItem = new ItemType({
                name: "เสื้อเชิ้ต",
                engName: "Shirt",
                thName: "เสื้อเชิ้ต",
                code: "SHT"
            })
            newItem.save()
            .then((saveItem) => {
                fristTypeID = saveItem._id
                expect(saveItem.name).toEqual("เสื้อเชิ้ต")
                expect(saveItem.engName).toEqual("Shirt")
                expect(saveItem.thName).toEqual("เสื้อเชิ้ต")
                expect(saveItem.code).toEqual("SHT")
                done()                
            })
        })
        test("Find Shirt Type By ID",(done) => {
            ItemType.findById(fristTypeID)
                .then((findItemType) => {
                    expect(findItemType._id).toEqual(fristTypeID)
                    done()
                })
        })
        test("Find Shirt Type By Code",(done) => {
            ItemType.find({
                code: "SHT"
            })
                .then((findItemType) => {
                    expect(findItemType.length).toEqual(1);
                    expect(findItemType[0].code).toEqual("SHT")
                    done()
                })
        })
    })
    describe("Seconde Type",() => {
        test("Insert Pants Type", (done) => {
            //console.log("test: one plus one equal two")
            const newItem = new ItemType({
                name: "กางเกง",
                engName: "Pants",
                thName: "กางเกง",
                code: "PNT"
            })
            newItem.save()
            .then((saveItem) => {
                fristTypeID = saveItem._id
                expect(saveItem.name).toEqual("กางเกง")
                expect(saveItem.engName).toEqual("Pants")
                expect(saveItem.thName).toEqual("กางเกง")
                expect(saveItem.code).toEqual("PNT")
                done()                
            })
        })
    })
    describe("Cont ItemType",() => {
        test("ItemType must have 2 ",(done) => {
            ItemType.find({})
                .then((AllItemType) => {
                    expect(AllItemType).toHaveLength(2);
                    expect(AllItemType[0].code).toEqual("SHT");
                    expect(AllItemType[1].code).toEqual("PNT");
                    done()
                })
        })
    })
}, 60000)
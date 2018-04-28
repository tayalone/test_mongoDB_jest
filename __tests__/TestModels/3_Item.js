const config = require('../../Config/config')
const mongoose = require('mongoose')
const ItemType = require('../../Models/ItemType')
const ItemDomain = require('../../Models/ItemDomain')
const Item = require('../../Models/Item')
const MockData = require('./MockData/3_Item/data')
const itemTypeData = MockData.itemType
const itemDomainData = MockData.itemDomain

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
    let redShirtSmallID = "";
    let redShirtLargeID = "";
    let yellowShirtMedlID = "";
    let yellowShirtXLargeID = "";
    let green36incs = "";
    let green40incs = "";
    beforeAll((done) => {
        mongoose.connection.db.dropDatabase()
            .then(() => {
                return ItemType.collection.insertMany(itemTypeData)
            })
            .then((respond) => {
                return ItemDomain.collection.insertMany(itemDomainData)
            })
            .then((respond) => {
                done()
            })
            .catch((err) => {
                console.log(err)
                done()
            })
    })
    describe("Red Shirt : Small",() => {
        test("Insert Red Shirt : Small", (done) => {
            const newItem = Item({
                thName: "ขนาดเล็ก",
                enName: "size s",
                price: 200,
                itemDomainID: mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6")
            })
            newItem.save()
                .then((saveItem) => {
                    return saveItem
                }).then((saveItem) => {
                    return ItemDomain.findByIdAndUpdate("5ac9adbc6d2ed7058ca801c6", {
                        $push: { items: saveItem._id } 
                    },{ 'new': true})
                    .then(()=>{
                        return saveItem
                    })
                })
                .then((saveItem) =>{
                    redShirtSmallID = saveItem._id
                    expect(saveItem.thName).toEqual("ขนาดเล็ก")
                    expect(saveItem.enName).toEqual("size s")
                    expect(saveItem.price).toEqual(200)
                    expect(saveItem.itemDomainID).toEqual(mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"))
                    done()
                })
        })
        describe("Populate Model", () => {
            let TestItem = ""
            beforeAll((done) => {
                Item.findById(redShirtSmallID)
                .populate({
                    path:'itemDomainID',
                    populate : {
                        path: 'itemTypeID'
                    }
                })
                .then((item) => {
                    TestItem = item
                    done()
                })
            }) 
            test("Item Domain Name is : Red Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.name).toEqual("Red Shirt")
                done()
            })
            test("Item Domain items length: 1", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items.length).toEqual(1)
                done()
            })
            test("Item Domain 1st itemsID equal Red Shirt : Small", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items[0]).toEqual(redShirtSmallID)
                done()
            })
            test("Item Type Name is : Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.itemTypeID.engName).toEqual("Shirt")
                done()
            })
        })
    })
    describe("Red Shirt : Large",() => {
        test("Inser Red Shirt : Large", (done) => {
            const newItem = Item({
                thName: "ขนาดใหญ่",
                enName: "size l",
                price: 220,
                itemDomainID: mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6")
            })
            newItem.save()
                .then((saveItem) => {
                    return saveItem
                }).then((saveItem) => {
                    return ItemDomain.findByIdAndUpdate("5ac9adbc6d2ed7058ca801c6", {
                        $push: { items: saveItem._id } 
                    },{ 'new': true})
                    .then(()=>{
                        return saveItem
                    })
                })
                .then((saveItem) =>{
                    redShirtLargeID = saveItem._id
                    expect(saveItem.thName).toEqual("ขนาดใหญ่")
                    expect(saveItem.enName).toEqual("size l")
                    expect(saveItem.price).toEqual(220)
                    expect(saveItem.itemDomainID).toEqual(mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"))
                    done()
                })
        })
        describe("Populate Model", () => {
            let TestItem = ""
            beforeAll((done) => {
                Item.findById(redShirtLargeID)
                .populate({
                    path:'itemDomainID',
                    populate : {
                        path: 'itemTypeID'
                    }
                })
                .then((item) => {
                    TestItem = item
                    done()
                })
            })
            test("Item Domain Name is : Red Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.name).toEqual("Red Shirt")
                done()
            })
            test("Item Domain items length: 1", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items.length).toEqual(2)
                done()
            })
            test("Item Domain 2nd itemsID equal Red Shirt : Large", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items[1]).toEqual(redShirtLargeID)
                done()
            })
            test("Item Type Name is : Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.itemTypeID.engName).toEqual("Shirt")
                done()
            }) 

        })
    })
    describe("Yellow Shirt : Medium",() => {
        test("Inser Yellow Shirt : Medium", (done) => {
            const newItem = Item({
                thName: "ขนาดกลาง",
                enName: "size m",
                price: 240,
                itemDomainID: mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7")
            })
            newItem.save()
                .then((saveItem) => {
                    return saveItem
                }).then((saveItem) => {
                    return ItemDomain.findByIdAndUpdate("5ac9adbd6d2ed7058ca801c7", {
                        $push: { items: saveItem._id } 
                    },{ 'new': true})
                    .then(()=>{
                        return saveItem
                    })
                })
                .then((saveItem) =>{
                    yellowShirtMedlID = saveItem._id
                    expect(saveItem.thName).toEqual("ขนาดกลาง")
                    expect(saveItem.enName).toEqual("size m")
                    expect(saveItem.price).toEqual(240)
                    expect(saveItem.itemDomainID).toEqual(mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"))
                    done()
                })
        })
        describe("Populate Model", () => {
            let TestItem = ""
            beforeAll((done) => {
                Item.findById(yellowShirtMedlID)
                .populate({
                    path:'itemDomainID',
                    populate : {
                        path: 'itemTypeID'
                    }
                })
                .then((item) => {
                    TestItem = item
                    done()
                })
            }) 
            test("Item Domain Name is : Yellow Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.name).toEqual("Yellow Shirt")
                done()
            })
            test("Item Domain items length: 1", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items.length).toEqual(1)
                done()
            })
            test("Item Domain 1st itemsID equal Yellow Shirt : Medium", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items[0]).toEqual(yellowShirtMedlID)
                done()
            })
            test("Item Type Name is : Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.itemTypeID.engName).toEqual("Shirt")
                done()
            })
        })
    })
    describe("Yellow Shirt : XLarge",() => {
        test("Inser Yellow Shirt : XLarge", (done) => {
            const newItem = Item({
                thName: "ขนาดใหญ่พิเศษ",
                enName: "size xl",
                price: 260,
                itemDomainID: mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7")
            })
            newItem.save()
                .then((saveItem) => {
                    return saveItem
                }).then((saveItem) => {
                    return ItemDomain.findByIdAndUpdate("5ac9adbd6d2ed7058ca801c7", {
                        $push: { items: saveItem._id } 
                    },{ 'new': true})
                    .then(()=>{
                        return saveItem
                    })
                })
                .then((saveItem) =>{
                    yellowShirtXLargeID = saveItem._id
                    expect(saveItem.thName).toEqual("ขนาดใหญ่พิเศษ")
                    expect(saveItem.enName).toEqual("size xl")
                    expect(saveItem.price).toEqual(260)
                    expect(saveItem.itemDomainID).toEqual(mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"))
                    done()
                })
        })
        describe("Populate Model", () => {
            let TestItem = ""
            beforeAll((done) => {
                Item.findById(yellowShirtXLargeID)
                .populate({
                    path:'itemDomainID',
                    populate : {
                        path: 'itemTypeID'
                    }
                })
                .then((item) => {
                    TestItem = item
                    done()
                })
            })
            test("Item Domain Name is : Yellow Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.name).toEqual("Yellow Shirt")
                done()
            })
            test("Item Domain items length: 2", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items.length).toEqual(2)
                done()
            })
            test("Item Domain 2nd itemsID equal Yellow Shirt : XLarge", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items[1]).toEqual(yellowShirtXLargeID)
                done()
            })
            test("Item Type Name is : Shirt", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.itemTypeID.engName).toEqual("Shirt")
                done()
            }) 
        })
    })
    describe("Green Pants : 36 incs",() => {
        test("Inser Green Pants : 36 incs", (done) => {   
            const newItem = Item({
                thName: "36 นิ้ว",
                enName: "36 incs",
                price: 400,
                itemDomainID: mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8")
            })
            newItem.save()
                .then((saveItem) => {
                    return saveItem
                }).then((saveItem) => {
                    return ItemDomain.findByIdAndUpdate("5ac9adbf6d2ed7058ca801c8", {
                        $push: { items: saveItem._id } 
                    },{ 'new': true})
                    .then(()=>{
                        return saveItem
                    })
                })
                .then((saveItem) =>{
                    green36incs = saveItem._id
                    expect(saveItem.thName).toEqual("36 นิ้ว")
                    expect(saveItem.enName).toEqual("36 incs")
                    expect(saveItem.price).toEqual(400)
                    expect(saveItem.itemDomainID).toEqual(mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"))
                    done()
            })
        })
        describe("Populate Model", () => {
            let TestItem = ""
            beforeAll((done) => {
                Item.findById(green36incs)
                .populate({
                    path:'itemDomainID',
                    populate : {
                        path: 'itemTypeID'
                    }
                })
                .then((item) => {
                    TestItem = item
                    done()
                })
            }) 
            test("Item Domain Name is : Green Pants", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.name).toEqual("Green Pants")
                done()
            })
            test("Item Domain items length: 1", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items.length).toEqual(1)
                done()
            })
            test("Item Domain 1st itemsID equal Green Pants : 36incs", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items[0]).toEqual(green36incs)
                done()
            })
            test("Item Type Name is : Pants", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.itemTypeID.engName).toEqual("Pants")
                done()
            })
        })
    })
    describe("Green Pants : 40 incs",() => {
        test("Inser Green Pants : 40 incs", (done) => {
            const newItem = Item({
                thName: "40 นิ้ว",
                enName: "40 incs",
                price: 450,
                itemDomainID: mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8")
            })
            newItem.save()
                .then((saveItem) => {
                    return saveItem
                }).then((saveItem) => {
                    return ItemDomain.findByIdAndUpdate("5ac9adbf6d2ed7058ca801c8", {
                        $push: { items: saveItem._id } 
                    },{ 'new': true})
                    .then(()=>{
                        return saveItem
                    })
                })
                .then((saveItem) =>{
                    green40incs = saveItem._id
                    expect(saveItem.thName).toEqual("40 นิ้ว")
                    expect(saveItem.enName).toEqual("40 incs")
                    expect(saveItem.price).toEqual(450)
                    expect(saveItem.itemDomainID).toEqual(mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"))
                    done()
            })
        })
        describe("Populate Model", () => {
            let TestItem = ""
            beforeAll((done) => {
                Item.findById(green36incs)
                .populate({
                    path:'itemDomainID',
                    populate : {
                        path: 'itemTypeID'
                    }
                })
                .then((item) => {
                    TestItem = item
                    done()
                })
            }) 
            test("Item Domain Name is : Green Pants", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.name).toEqual("Green Pants")
                done()
            })
            test("Item Domain items length: 2", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items.length).toEqual(2)
                done()
            })
            test("Item Domain 1st itemsID equal Green Pants : 40incs", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.items[1]).toEqual(green40incs)
                done()
            })
            test("Item Type Name is : Pants", (done) => {
                //console.log(TestItem)
                expect(TestItem.itemDomainID.itemTypeID.engName).toEqual("Pants")
                done()
            })
        })
    })
},60000)
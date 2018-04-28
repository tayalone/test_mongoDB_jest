const config = require('../../Config/config')
const mongoose = require('mongoose')
const ItemDomain = require('../../Models/ItemDomain')
const ItemType = require('../../Models/ItemType')
const MockData = require('./MockData/2_ItemDomain/data')

const itemTypeData = MockData.itemType

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

describe("Test: ItemDomain Models ...",() => {
    beforeAll((done) => {
        mongoose.connection.db.dropDatabase()
            .then(() => {
                return ItemType.collection.insertMany(itemTypeData)
            })
            .then((respond) => {
                done()
            })
            .catch((err) => {
                console.log(err)
                done()
            })
    })
    describe("First ItemDomain", () => {
        test("Insert ItemDomain - Type Shirt 1",(done) => {
            ItemType.findById("5ac8d09365231380596e8aa4")
                .then((findItemType) => {
                    return ItemDomain.find({
                        ItemTypeID : findItemType._id
                    })
                    .then((itemDomainByType) => {
                        return {
                            findItemType: findItemType,
                            itemDomainByType: itemDomainByType
                        }
                    })
                })
                .then((obj) => {
                    const itemID = obj.itemDomainByType.length+1
                    expect(itemID).toEqual(1)
                    const newItemDomain = new ItemDomain({
                        name: "Red Shirt",
                        itemID: obj.findItemType.code+"-" + addZero(6,itemID),
                        itemTypeID: obj.findItemType._id,
                        gallerys: ['Type-shirt1_1.jpg','Type-shirt1_2.jpg','Type-shirt1_3.jpg'] 
                    })
                    return newItemDomain.save()
                            .then((savedItemDomain) => {
                                return savedItemDomain
                            })
                })
                .then((savedItemDomain) => {
                    expect(savedItemDomain.name).toEqual("Red Shirt")
                    expect(savedItemDomain.itemID.length).toEqual(10)
                    expect(savedItemDomain.itemID).toMatch(/SHT-/);
                    expect(savedItemDomain.gallerys.length).toEqual(3);
                    expect(['Type-shirt1_1.jpg','Type-shirt1_2.jpg','Type-shirt1_3.jpg'])
                            .toEqual(expect.arrayContaining(savedItemDomain.gallerys))
                    expect(savedItemDomain.haveWholeSalesPrice).toEqual(false)
                    expect(savedItemDomain.items.length).toEqual(0)
                    expect(savedItemDomain.wholeSalePrices.length).toEqual(0)
                    done()
                })
        })
    })
    describe("Second ItemDomain", () => {
        test("Insert ItemDomain - Type Shirt 2",(done) => {
            ItemType.findById("5ac8d09365231380596e8aa4")
                .then((findItemType) => {
                    return ItemDomain.find({
                        itemTypeID : findItemType._id
                    })
                    .then((itemDomainByType) => {
                        //console.log(itemDomainByType)
                        return {
                            findItemType: findItemType,
                            itemDomainByType: itemDomainByType
                        }
                    })
                })
                .then((obj) => {
                    //console.log(obj.itemDomainByType)
                    const itemID = obj.itemDomainByType.length+1
                    expect(itemID).toEqual(2)
                    const newItemDomain = new ItemDomain({
                        name: "Yellow Shirt",
                        itemID: obj.findItemType.code+"-" + addZero(6,itemID),
                        itemTypeID: obj.findItemType._id,
                        gallerys: ['Type-shirt2_1.jpg','Type-shirt2_2.jpg','Type-shirt2_3.jpg'] 
                    })
                    return newItemDomain.save()
                            .then((savedItemDomain) => {
                                return savedItemDomain
                            })
                })
                .then((savedItemDomain) => {
                    expect(savedItemDomain.name).toEqual("Yellow Shirt")
                    expect(savedItemDomain.itemID.length).toEqual(10)
                    expect(savedItemDomain.itemID).toMatch(/SHT-/);
                    expect(savedItemDomain.gallerys.length).toEqual(3);
                    expect(['Type-shirt2_1.jpg','Type-shirt2_2.jpg','Type-shirt2_3.jpg'])
                            .toEqual(expect.arrayContaining(savedItemDomain.gallerys))
                    expect(savedItemDomain.haveWholeSalesPrice).toEqual(false)
                    expect(savedItemDomain.items.length).toEqual(0)
                    expect(savedItemDomain.wholeSalePrices.length).toEqual(0)
                    done()
                })
        })
    })
    describe("Third ItemDomain", () => {
        test("Insert ItemDomain - Type Pants 1",(done) => {
            ItemType.findById("5ac8d09365231380596e8aa5")
                .then((findItemType) => {
                    //console.log(findItemType)
                    return ItemDomain.find({
                        ItemTypeID : findItemType._id
                    })
                    .then((itemDomainByType) => {
                        return {
                            findItemType: findItemType,
                            itemDomainByType: itemDomainByType
                        }
                    })
                })
                .then((obj) => {
                    const itemID = obj.itemDomainByType.length+1
                    expect(itemID).toEqual(1)
                    const newItemDomain = new ItemDomain({
                        name: "Green Pants",
                        itemID: obj.findItemType.code+"-" + addZero(6,itemID),
                        itemTypeID: obj.findItemType._id,
                        gallerys: ['Type-pants1_1.jpg','Type-pants1_2.jpg','Type-pants1_3.jpg'] 
                    })
                    return newItemDomain.save()
                            .then((savedItemDomain) => {
                                return savedItemDomain
                            })
                })
                .then((savedItemDomain) => {
                    expect(savedItemDomain.name).toEqual("Green Pants")
                    expect(savedItemDomain.itemID.length).toEqual(10)
                    expect(savedItemDomain.itemID).toMatch(/PNT-/);
                    expect(savedItemDomain.gallerys.length).toEqual(3);
                    expect(['Type-pants1_1.jpg','Type-pants1_2.jpg','Type-pants1_3.jpg'] )
                            .toEqual(expect.arrayContaining(savedItemDomain.gallerys))
                    expect(savedItemDomain.haveWholeSalesPrice).toEqual(false)
                    expect(savedItemDomain.items.length).toEqual(0)
                    expect(savedItemDomain.wholeSalePrices.length).toEqual(0)
                    done()
                })
        })
    })
    describe("Count ItemDomain By Item Type",() => {
        test("Count By Shirt equal 2",(done) => {
            ItemDomain.find({itemTypeID : "5ac8d09365231380596e8aa4" })
                .then((respond) => {
                    expect(respond.length).toEqual(2)
                    done()
                })
        })
        test("Cont By Pants equal 1",(done) => {
            ItemDomain.find({itemTypeID : "5ac8d09365231380596e8aa5"})
                .then((respond) => {
                    expect(respond.length).toEqual(1)
                    done()
                })
        })
    })
}, 600000)

function addZero(size, number) {
    var s = String(number);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
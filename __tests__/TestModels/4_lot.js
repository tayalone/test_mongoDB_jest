const config = require('../../Config/config')
const mongoose = require('mongoose')
const ItemType = require('../../Models/ItemType')
const ItemDomain = require('../../Models/ItemDomain')
const Item = require('../../Models/Item')
const Lot = require('../../Models/Lot')
const MockData = require('./MockData/4_lot/data')
const itemTypeData = MockData.itemType
const itemDomainData = MockData.itemDomain
const itemData = MockData.item

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

 let Lot1ID =""
 let Lot2ID =""
 describe("Test: Lot Models ...",() => {
     
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
                done()
            })
            .catch((err) => {
                console.log(err)
                done()
            })
    })
    describe("Lot1 : ",() => {
        test("create Lot1: ",(done) => {
            Lot.find({})
            .then((AllLot) => {
                expect(AllLot.length).toEqual(0)
                const newLot = new Lot({
                    name: `Lot ${AllLot.length+1}`,
                    shippingName: `shipping numba one`,
                    shippingTracking: `Tracking numba one`,
                    costAll: 30850+2000+500,
                    transpotCostCn_Th: 2000,
                    transpotCostTh_Th: 500,
                    allQuantity: 135,
                    costPerItem: 18.52
                })
                return newLot.save()
                        .then((savedLot)=> {
                            return savedLot
                        })
            })
            .then ((savedLot) => {
                Lot1ID = savedLot._id
                expect(savedLot.name).toEqual("Lot 1")
                expect(savedLot.shippingName).toEqual("shipping numba one")
                expect(savedLot.costAll).toEqual(33350)
                done()
            })
        })
        test("ADD Red Shrit size s to lot 1:", (done) => {
            const item1 = {
                itemID : mongoose.Types.ObjectId("5acb0c68de95b82495937ccd"),
                price : 100,
                quantity: 10
            }
            Lot.findByIdAndUpdate(Lot1ID, 
                { $push: { items: item1 } } ,
                {new: true} )
                .then((Lot1Updated)=> {
                    expect(Lot1Updated._id).toEqual(Lot1ID)
                    expect(Lot1Updated.items.length).toEqual(1)
                    return Lot1Updated
                })
                .then((Lot1Updated) => {
                    const lot1 = {
                        lotID: Lot1Updated._id,
                        totalQuantity: 10,
                        watchQuantity: 10,
                        price: 100,
                        transportCost: Lot1Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c68de95b82495937ccd", 
                            {
                                $push: {stocks: lot1},
                                $inc:  {allQuantity: 10, "quantity.stock": 10},
                            },     
                            {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(1)
                            expect(ItemUpdated.allQuantity).toEqual(10)
                            expect(ItemUpdated.quantity.stock).toEqual(10)
                            done()
                    })
                })
        })
        test("ADD Red Shrit size l to lot 1:", (done) => {
            const item2 = {
                itemID : mongoose.Types.ObjectId("5acb0c6ade95b82495937cce"),
                price : 120,
                quantity: 15
            }
            Lot.findByIdAndUpdate(Lot1ID, {$push: { items: item2 } } , {new: true} )
                .then((Lot1Updated)=> {
                    expect(Lot1Updated._id).toEqual(Lot1ID)
                    expect(Lot1Updated.items.length).toEqual(2)
                    return Lot1Updated
                })
                .then((Lot1Updated) => {
                    const lot1 = {
                        lotID: Lot1Updated._id,
                        totalQuantity: 15,
                        watchQuantity: 15,
                        price: 120,
                        transportCost: Lot1Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c6ade95b82495937cce", 
                        {$push: {stocks: lot1}, $inc:  {allQuantity: 15, "quantity.stock": 15} },
                        {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(1)
                            expect(ItemUpdated.allQuantity).toEqual(15)
                            expect(ItemUpdated.quantity.stock).toEqual(15)
                            done()
                    })
                })
        })
        test("ADD Yellow Shrit size m to lot 1:", (done) => {
            const item2 = {
                itemID : mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf"),
                price : 140,
                quantity: 20
            }
            Lot.findByIdAndUpdate(Lot1ID, {$push: { items: item2 } } , {new: true} )
                .then((Lot1Updated)=> {
                    expect(Lot1Updated._id).toEqual(Lot1ID)
                    expect(Lot1Updated.items.length).toEqual(3)
                    return Lot1Updated
                })
                .then((Lot1Updated) => {
                    const lot1 = {
                        lotID: Lot1Updated._id,
                        totalQuantity: 20,
                        watchQuantity: 20,
                        price: 140,
                        transportCost: Lot1Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c6bde95b82495937ccf", 
                        {$push: {stocks: lot1}, $inc:  {allQuantity: 20, "quantity.stock": 20} },
                        {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(1)
                            expect(ItemUpdated.allQuantity).toEqual(20)
                            expect(ItemUpdated.quantity.stock).toEqual(20)
                            done()
                    })
                })
        })
        test("ADD Yellow Shrit size xl to lot 1:", (done) => {
            const item2 = {
                itemID : mongoose.Types.ObjectId("5acb0c6ede95b82495937cd0"),
                price : 160,
                quantity: 25
            }
            Lot.findByIdAndUpdate(Lot1ID, {$push: { items: item2 } } , {new: true} )
                .then((Lot1Updated)=> {
                    expect(Lot1Updated._id).toEqual(Lot1ID)
                    expect(Lot1Updated.items.length).toEqual(4)
                    return Lot1Updated
                })
                .then((Lot1Updated) => {
                    const lot1 = {
                        lotID: Lot1Updated._id,
                        totalQuantity: 25,
                        watchQuantity: 25,
                        price: 140,
                        transportCost: Lot1Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c6ede95b82495937cd0", 
                        {$push: {stocks: lot1}, $inc:  {allQuantity: 25, "quantity.stock": 25} },
                        {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(1)
                            expect(ItemUpdated.allQuantity).toEqual(25)
                            expect(ItemUpdated.quantity.stock).toEqual(25)
                            done()
                    })
                })
        })
        test("ADD Green Pants size 36 incs lot 1:", (done) => {
            const item2 = {
                itemID : mongoose.Types.ObjectId("5acb0c70de95b82495937cd1"),
                price : 300,
                quantity: 30
            }
            Lot.findByIdAndUpdate(Lot1ID, {$push: { items: item2 } } , {new: true} )
                .then((Lot1Updated)=> {
                    expect(Lot1Updated._id).toEqual(Lot1ID)
                    expect(Lot1Updated.items.length).toEqual(5)
                    return Lot1Updated
                })
                .then((Lot1Updated) => {
                    const lot1 = {
                        lotID: Lot1Updated._id,
                        totalQuantity: 30,
                        watchQuantity: 30,
                        price: 300,
                        transportCost: Lot1Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c70de95b82495937cd1", 
                        {$push: {stocks: lot1}, $inc:  {allQuantity: 30, "quantity.stock": 30} },
                        {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(1)
                            expect(ItemUpdated.allQuantity).toEqual(30)
                            expect(ItemUpdated.quantity.stock).toEqual(30)
                            done()
                    })
                })
        })
        test("ADD Green Pants size 40 incs lot 1:", (done) => {
            const item2 = {
                itemID : mongoose.Types.ObjectId("5acb0c71de95b82495937cd2"),
                price : 350,
                quantity: 35
            }
            Lot.findByIdAndUpdate(Lot1ID, {$push: { items: item2 } } , {new: true} )
                .then((Lot1Updated)=> {
                    expect(Lot1Updated._id).toEqual(Lot1ID)
                    expect(Lot1Updated.items.length).toEqual(6)
                    return Lot1Updated
                })
                .then((Lot1Updated) => {
                    const lot1 = {
                        lotID: Lot1Updated._id,
                        totalQuantity: 35,
                        watchQuantity: 35,
                        price: 350,
                        transportCost: Lot1Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c71de95b82495937cd2", 
                        {$push: {stocks: lot1}, $inc:  {allQuantity: 35, "quantity.stock": 35} },
                        {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(1)
                            expect(ItemUpdated.allQuantity).toEqual(35)
                            expect(ItemUpdated.quantity.stock).toEqual(35)
                            done()
                    })
                })
        })
        describe("Dependency Data", () => {
            test("Red Shrit size s ",(done) => {
                Item.findById("5acb0c68de95b82495937ccd")
                .then((findItem) => {
                    const stocks  = findItem.stocks
                    const findLot1 = stocks.find((stock) => {
                        const lotID = stock.lotID
                        //console.log(lotID.equals(Lot1ID))
                        return lotID.equals(Lot1ID)
                    })
                    expect(findItem.stocks.length).toEqual(1)
                    expect(findLot1).not.toBeNull()
                    expect(findItem.quantity.shoppee).toEqual(0)
                    expect(findItem.quantity.stock).toEqual(10)
                    done()
                })
            })
        })
    })
    describe("Lot2: ",() => {
        test("create Lot2: ",(done) => {
            Lot.find({})
            .then((AllLot) => {
                expect(AllLot.length).toEqual(1)
                const newLot = new Lot({
                    name: `Lot ${AllLot.length+1}`,
                    shippingName: `shipping numba two`,
                    shippingTracking: `Tracking numba tow`,
                    costAll: 3600+1875+3000+700,
                    transpotCostCn_Th: 3000,
                    transpotCostTh_Th: 700,
                    allQuantity: 35,
                    costPerItem: 105.72
                })
                return newLot.save()
                        .then((savedLot)=> {
                            return savedLot
                        })
            })
            .then ((savedLot) => {
                Lot2ID = savedLot._id
                expect(savedLot.name).toEqual("Lot 2")
                expect(savedLot.shippingName).toEqual("shipping numba two")
                expect(savedLot.costAll).toEqual(9175)
                done()
            })
        })
        test("ADD Red Shrit size s to lot 2:", (done) => {
            const item1 = {
                itemID : mongoose.Types.ObjectId("5acb0c68de95b82495937ccd"),
                price : 125,
                quantity: 15
            }
            Lot.findByIdAndUpdate(Lot2ID, 
                { $push: { items: item1 } } ,
                {new: true} )
                .then((Lot2Updated)=> {
                    expect(Lot2Updated._id).toEqual(Lot2ID)
                    expect(Lot2Updated.items.length).toEqual(1)
                    return Lot2Updated
                })
                .then((Lot2Updated) => {
                    const lot2 = {
                        lotID: Lot2Updated._id,
                        totalQuantity: 15,
                        watchQuantity: 15,
                        price: 125,
                        transportCost: Lot2Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c68de95b82495937ccd", 
                            {
                                $push: {stocks: lot2},
                                $inc:  {allQuantity: 15, "quantity.stock": 15},
                            },     
                            {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(2)
                            expect(ItemUpdated.allQuantity).toEqual(25)
                            expect(ItemUpdated.quantity.stock).toEqual(25)
                            done()
                    })
                })
        })
        test("ADD Yellow Shrit size m to lot 2:", (done) => {
            const item2 = {
                itemID : mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf"),
                price : 180,
                quantity: 20
            }
            Lot.findByIdAndUpdate(Lot2ID, {$push: { items: item2 } } , {new: true} )
                .then((Lot2Updated)=> {
                    expect(Lot2Updated._id).toEqual(Lot2ID)
                    expect(Lot2Updated.items.length).toEqual(2)
                    return Lot2Updated
                })
                .then((Lot2Updated) => {
                    const lot2 = {
                        lotID: Lot2Updated._id,
                        totalQuantity: 20,
                        watchQuantity: 20,
                        price: 180,
                        transportCost: Lot2Updated.costPerItem
                    }
                    return Item.findByIdAndUpdate("5acb0c6bde95b82495937ccf", 
                        {$push: {stocks: lot2}, $inc:  {allQuantity: 20, "quantity.stock": 20} },
                        {new: true})
                    .then((ItemUpdated) => {
                            expect(ItemUpdated.stocks.length).toEqual(2)
                            expect(ItemUpdated.allQuantity).toEqual(40)
                            expect(ItemUpdated.quantity.stock).toEqual(40)
                            done()
                    })
                })
        })
    })
 },60000)
const config = require('../../Config/config')
const mongoose = require('mongoose')
const _ =require('lodash')
// ----------- Model ---------------------
const ItemType = require('../../Models/ItemType')
const ItemDomain = require('../../Models/ItemDomain')
const Item = require('../../Models/Item')
const Lot = require('../../Models/Lot')
const PostPrice = require('../../Models/PostPrice')
const Order = require('../../Models/Order')
// -----------------------------------------
// ------------ Mock Data -----------------
const MockData = require('./MockData/6_Order/data')
const itemTypeData = MockData.itemType
const itemDomainData = MockData.itemDomain
const itemData = MockData.item
const lotData = MockData.lot
const postPriceData = MockData.postPrice
const userID = MockData.userID
const adminID = MockData.adminID
//--------------------------------------------


let adminOrderStockID = ""
let adminOrderShoppeeID = ""
let userOrderStockID = ""
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

 describe("Orders Model ...", () => {
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
                return PostPrice.collection.insertMany(postPriceData)
            })
            .then((respond) => {
                done()
            })
            .catch((err) => {
                console.log(err)
                done()
            })
    },60000)

    describe("Admin Add stock Order send Ems:",() => {
        describe("Create Stock Order :", () => {
            test("Create Success Order", (done) => {
                newOrder = new Order({
                    orderType: "stock",
                    userID: adminID,
                    postPriceID: postPriceData[0]._id,
                    tracking: "tracking 1"
                })
                newOrder.save()
                    .then((savedOrder) => {
                        adminOrderStockID = savedOrder._id
                        expect(savedOrder.orderType).toEqual("stock")
                        expect(savedOrder.userID).toEqual(adminID)
                        done()
                    })
            })
        describe("Add Red Shirt : small :",() => {
            describe("add 15 pcs (use 2 lot)",() => {
                test("add item to order Complete", (done) => {
                        Item.find(
                            { allQuantity : { $gte: 15 }, "quantity.stock" : { $gte: 15 }, _id: "5acb0c68de95b82495937ccd"}
                        )
                        .then((findItem) => {
                            expect(findItem.length).toEqual(1)
                            expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(15)
                            expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(15)
                            return findItem[0]
                        })
                        .then((findItem) => {
                             const result = createItemsOrders(findItem, 15, findItem.price)
                             //console.log(result)
                             findItem.stocks = result.updateStock
                             findItem.orders.push(adminOrderStockID)
                             findItem.allQuantity = findItem.allQuantity-15
                             findItem.quantity.stock = findItem.quantity.stock-15
                             return findItem.save()
                                    .then((updatedItemStock)=> {
                                        return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                                    })
                        })
                        .then((obj) => {
                            //console.log(obj.itemsOrders)
                            expect(obj.updatedItemStock.orders.length).toEqual(1)
                            expect(obj.updatedItemStock.orders[0]).toEqual(adminOrderStockID)
                            expect(obj.updatedItemStock.allQuantity).toEqual(10)
                            expect(obj.updatedItemStock.quantity.stock).toEqual(10)
                            expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(0)
                            expect(obj.updatedItemStock.stocks[1].watchQuantity).toEqual(10)
                            
                            return Order.findByIdAndUpdate( adminOrderStockID,
                                { $addToSet: { items: { $each: obj.itemsOrders} } },
                                { new : true }
                            )
                            .then((updateOrder) => {
                                return(updateOrder)
                            })
                        })
                        .then((updateOrder) => {
                            //console.log(updateOrder.items.length)
                            expect(updateOrder.items.length).toEqual(2)
                            expect(updateOrder.items[0].quantity).toEqual(10)
                            expect(updateOrder.items[1].quantity).toEqual(5)
                            done()
                        })
                    })
                })
            })
            describe("update 15 -> 11 pcs (1lot)",() => {
                let item1
                let order1
                const oldQunatity = 15;
                describe("Test About Update" ,() => {
                    test("Red Shirt : Small have quantity enough",(done) => {
                        Item.find(
                            { allQuantity : { $gte: 11-oldQunatity }, "quantity.stock" : { $gte: 11-oldQunatity }, _id: "5acb0c68de95b82495937ccd"})
                        .then((findItem) => {
                            item1 = findItem[0]
                            expect(findItem.length).toEqual(1)
                            done()
                        })
                    })
                    test("find Order by ID",(done) => {
                        Order.find({_id:adminOrderStockID})
                        .then((findOreder) => {
                            order1 = findOreder[0]
                            expect(findOreder.length).toEqual(1)
                            done()
                        })
                    })
                    test("Remove orderID and return quantity to item1",(done) => {
                        const updateOrder = item1.orders.filter((order) => {
                            return !order.equals(order1._id)
                        })
                        expect(item1.orders.length).toEqual(1)
                        const newStock = removeItemsOrders(item1, oldQunatity)
                        //console.log(newStock)
                        item1.orders = updateOrder
                        item1.stocks = newStock
                        item1.allQuantity = item1.allQuantity + oldQunatity
                        item1.quantity.stock = item1.quantity.stock+ oldQunatity
                        item1.save()
                        .then((updateItem1) => {
                            expect(updateItem1.orders.length).toEqual(0)
                            expect(updateItem1.allQuantity).toEqual(25)
                            expect(updateItem1.quantity.stock).toEqual(25)
                            expect(updateItem1.stocks[0].watchQuantity).toEqual(10)
                            expect(updateItem1.stocks[1].watchQuantity).toEqual(15)
                            //console.log(item1)
                            done()
                        })
                    })
                    test("Remove itemID from order1",(done) => {
                        const updateItems = order1.items.filter((item)=> {
                            return !item.itemID.equals(item1._id)
                        })
                        //console.log(updateItems)
                        expect(order1.items.length).toEqual(2)
                        order1.items = updateItems
                        order1.save()
                        .then((updateOrder1) => {
                            expect(updateOrder1.items.length).toEqual(0)
                            done()
                        })
                    })
                    test("add 11 pcs Red Shirt Small To Order",(done) => {
                        const result = createItemsOrders(item1, 11 ,item1.price)
                        //console.log(result)
                        const updateStock = result.updateStock
                        const itemsOrders = result.itemsOrders
                        item1.stocks = updateStock
                        item1.orders.push(order1._id)
                        item1.allQuantity = item1.allQuantity-11
                        item1.quantity.stock = item1.quantity.stock-11
                        item1.save()
                            .then((saveItem1) => {
                                expect(saveItem1.orders.length).toEqual(1)
                                expect(saveItem1.orders[0]).toEqual(order1._id)
                                expect(saveItem1.allQuantity).toEqual(14)
                                expect(saveItem1.quantity.stock).toEqual(14)
                                expect(saveItem1.stocks[0].watchQuantity).toEqual(0)
                                expect(saveItem1.stocks[1].watchQuantity).toEqual(14)
                                return Order.findOneAndUpdate( order1._id,
                                    { $addToSet: { items: { $each: itemsOrders} } },
                                    { new : true }
                                )
                                .then((updateOrder) => {
                                    order1 = updateOrder
                                    return(updateOrder)
                                })
                            })
                            .then((updateOrder) => {
                                expect(updateOrder.items.length).toEqual(2)
                                expect(updateOrder.items[0].quantity).toEqual(10)
                                expect(updateOrder.items[1].quantity).toEqual(1)
                                done()
                            })
                    })
                })
            })
            describe("update 11 -> 7 pcs (2lot)",() => {
                let item1
                let order1
                const oldQunatity = 11;
                describe("Test About Update" ,() => {
                    test("Red Shirt : Small have quantity enough",(done) => {
                        Item.find(
                            { allQuantity : { $gte: 7-oldQunatity }, "quantity.stock" : { $gte: 7-oldQunatity }, _id: "5acb0c68de95b82495937ccd"})
                        .then((findItem) => {
                            item1 = findItem[0]
                            expect(findItem.length).toEqual(1)
                            done()
                        })
                    })
                    test("find Order by ID",(done) => {
                        Order.find({_id:adminOrderStockID})
                        .then((findOreder) => {
                            order1 = findOreder[0]
                            expect(findOreder.length).toEqual(1)
                            done()
                        })
                    })
                    test("Remove orderID and return quantity to item1",(done) => {
                        const updateOrder = item1.orders.filter((order) => {
                            return !order.equals(order1._id)
                        })
                        expect(item1.orders.length).toEqual(1)
                        const newStock = removeItemsOrders(item1, oldQunatity)
                        //console.log(newStock)
                        item1.orders = updateOrder
                        item1.stocks = newStock
                        item1.allQuantity = item1.allQuantity + oldQunatity
                        item1.quantity.stock = item1.quantity.stock+ oldQunatity
                        item1.save()
                        .then((updateItem1) => {
                            expect(updateItem1.orders.length).toEqual(0)
                            expect(updateItem1.allQuantity).toEqual(25)
                            expect(updateItem1.quantity.stock).toEqual(25)
                            expect(updateItem1.stocks[0].watchQuantity).toEqual(10)
                            expect(updateItem1.stocks[1].watchQuantity).toEqual(15)
                            //console.log(item1)
                            done()
                        })
                    })
                    test("Remove itemID from order1",(done) => {
                        const updateItems = order1.items.filter((item)=> {
                            return !item.itemID.equals(item1._id)
                        })
                        //console.log(updateItems)
                        expect(order1.items.length).toEqual(2)
                        order1.items = updateItems
                        order1.save()
                        .then((updateOrder1) => {
                            expect(updateOrder1.items.length).toEqual(0)
                            done()
                        })
                    })
                    test("add 7 pcs Red Shirt Small To Order",(done) => {
                        const result = createItemsOrders(item1, 7, item1.price)
                        //console.log(result)
                        const updateStock = result.updateStock
                        const itemsOrders = result.itemsOrders
                        item1.stocks = updateStock
                        item1.orders.push(order1._id)
                        item1.allQuantity = item1.allQuantity-7
                        item1.quantity.stock = item1.quantity.stock-7
                        item1.save()
                            .then((saveItem1) => {
                                expect(saveItem1.orders.length).toEqual(1)
                                expect(saveItem1.orders[0]).toEqual(order1._id)
                                expect(saveItem1.allQuantity).toEqual(18)
                                expect(saveItem1.quantity.stock).toEqual(18)
                                expect(saveItem1.stocks[0].watchQuantity).toEqual(3)
                                expect(saveItem1.stocks[1].watchQuantity).toEqual(15)
                                return Order.findOneAndUpdate( order1._id,
                                    { $addToSet: { items: { $each: itemsOrders} } },
                                    { new : true }
                                )
                                .then((updateOrder) => {
                                    order1 = updateOrder
                                    return(updateOrder)
                                })
                            })
                            .then((updateOrder) => {
                                expect(updateOrder.items.length).toEqual(1)
                                expect(updateOrder.items[0].quantity).toEqual(7)
                                done()
                            })
                    })
                })
            })
        })
        describe("Add Yellow Shirt : medium :",() =>{
            describe("Add 21 pcs (user 2 lot)", () => {
                let item3 = ""
                test("add item to order compelte", (done) => {
                    Item.find(
                        { allQuantity : { $gte: 21 }, "quantity.stock" : { $gte: 21 }, _id: "5acb0c6bde95b82495937ccf"}
                    )
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(21)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(21)
                        item3 = findItem[0]
                        return(item3)
                    })
                    .then((findItem) => {
                        const result = createItemsOrders(findItem, 21, findItem.price)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(adminOrderStockID)
                        findItem.allQuantity = findItem.allQuantity-21
                        findItem.quantity.stock = findItem.quantity.stock-21
                        return findItem.save()
                               .then((updatedItemStock)=> {
                                   return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                               })
                   })
                   .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(1)
                        expect(obj.updatedItemStock.orders[0]).toEqual(adminOrderStockID)
                        expect(obj.updatedItemStock.allQuantity).toEqual(19)
                        expect(obj.updatedItemStock.quantity.stock).toEqual(19)
                        expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(0)
                        expect(obj.updatedItemStock.stocks[1].watchQuantity).toEqual(19)
                        return Order.findOneAndUpdate( adminOrderStockID,
                            { $addToSet: { items: { $each: obj.itemsOrders} } },
                            { new : true }
                        )
                        .then((updateOrder) => {
                            return(updateOrder)
                        })
                   })
                    .then((updateOrder) => {
                        //console.log(updateOrder.items.length)
                        expect(updateOrder.items.length).toEqual(3)
                        expect(updateOrder.items[1].quantity).toEqual(20)
                        expect(updateOrder.items[2].quantity).toEqual(1)
                        done()
                    })

                })
            })
            describe("Update 21 -> 15 pcs (2lot)",() => {
                let item3
                let order1
                const oldQunatity = 21;
                describe("Test About Update" ,() => { 
                    test("Yellow Shirt : medium have quantity enough",(done) => {
                        Item.find(
                            { allQuantity : { $gte: 15-oldQunatity }, "quantity.stock" : { $gte: 15-oldQunatity }, _id: "5acb0c6bde95b82495937ccf"})
                        .then((findItem) => {
                            item3 = findItem[0]
                            expect(findItem.length).toEqual(1)
                            done()
                        })
                    })
                    test("find Order by ID",(done) => {
                        Order.find({_id:adminOrderStockID})
                        .then((findOreder) => {
                            order1 = findOreder[0]
                            expect(findOreder.length).toEqual(1)
                            done()
                        })
                    })
                    test("Remove orderID and return quantity to item3",(done) => {
                        const updateOrder = item3.orders.filter((order) => {
                            return !order.equals(order1._id)
                        })
                        expect(item3.orders.length).toEqual(1)
                        const newStock = removeItemsOrders(item3, oldQunatity)
                        //console.log(newStock)
                        item3.orders = updateOrder
                        item3.stocks = newStock
                        item3.allQuantity = item3.allQuantity + oldQunatity
                        item3.quantity.stock = item3.quantity.stock+ oldQunatity
                        item3.save()
                        .then((updateItem3) => {
                            expect(updateItem3.orders.length).toEqual(0)
                            expect(updateItem3.allQuantity).toEqual(40)
                            expect(updateItem3.quantity.stock).toEqual(40)
                            expect(updateItem3.stocks[0].watchQuantity).toEqual(20)
                            expect(updateItem3.stocks[1].watchQuantity).toEqual(20)
                            //console.log(item1)
                            done()
                        })
                    })
                    test("Remove itemID from order1",(done) => {
                        const updateItems = order1.items.filter((item)=> {
                            return !item.itemID.equals(item3._id)
                        })
                        //console.log(updateItems)
                        expect(order1.items.length).toEqual(3)
                        order1.items = updateItems
                        order1.save()
                        .then((updateOrder1) => {
                            expect(updateOrder1.items.length).toEqual(1)
                            done()
                        })
                    })
                    test("add 15 pcs Yellow Shirt Medium To Order",(done) => {
                        const result = createItemsOrders(item3, 15, item3.price)
                        //console.log(result)
                        const updateStock = result.updateStock
                        const itemsOrders = result.itemsOrders
                        item3.stocks = updateStock
                        item3.orders.push(order1._id)
                        item3.allQuantity = item3.allQuantity-15
                        item3.quantity.stock = item3.quantity.stock-15
                        item3.save()
                            .then((saveItem3) => {
                                expect(saveItem3.orders.length).toEqual(1)
                                expect(saveItem3.orders[0]).toEqual(order1._id)
                                expect(saveItem3.allQuantity).toEqual(25)
                                expect(saveItem3.quantity.stock).toEqual(25)
                                expect(saveItem3.stocks[0].watchQuantity).toEqual(5)
                                expect(saveItem3.stocks[1].watchQuantity).toEqual(20)
                                return Order.findOneAndUpdate( order1._id,
                                    { $addToSet: { items: { $each: itemsOrders} } },
                                    { new : true }
                                )
                                .then((updateOrder) => {
                                    order1 = updateOrder
                                    return(updateOrder)
                                })
                            })
                            .then((updateOrder) => {
                                expect(updateOrder.items.length).toEqual(2)
                                expect(updateOrder.items[1].quantity).toEqual(15)
                                done()
                            })
                    })
                })
            })
        })
    })
    
    describe("Admin Add shoppee Order send Reg",() => {
        describe("Tranfer stock to shoppee Red Shirt : large",() => {
            let Item3
            test("Tranfer 7 pcs from stock to shoppee",(done) => {
                Item.findByIdAndUpdate("5acb0c6ade95b82495937cce",
                {"$inc": { "quantity.shoppee" : 7, "quantity.stock" : -7 }},
                {new: true})
                .then((updateItem) => {
                    Item3 = updateItem
                    expect(updateItem).not.toBeNull
                    done()
                })
            })
            test("Quantity at shoppee == 7", (done) => {
                expect(Item3.quantity.shoppee).toEqual(7)
                done()
            })
            test("Quantity at stock == 8", (done) => {
                expect(Item3.quantity.stock).toEqual(8)
                done()
            })
        })
        describe("Tranfer stock to shoppee Yellow Shirt : xlarge",() => {
            let Item3
            test("Tranfer 10 pcs from stock to shoppee",(done) => {
                Item.findByIdAndUpdate("5acb0c6ede95b82495937cd0",
                {"$inc": { "quantity.shoppee" : 10, "quantity.stock" : -10 }},
                {new: true})
                .then((updateItem) => {
                    Item3 = updateItem
                    expect(updateItem).not.toBeNull
                    done()
                })
            })
            test("Quantity at shoppee == 10", (done) => {
                expect(Item3.quantity.shoppee).toEqual(10)
                done()
            })
            test("Quantity at stock == 15", (done) => {
                expect(Item3.quantity.stock).toEqual(15)
                done()
            })
        })    
        describe("Tranfer strock to shoppee Red Shirt : small",() => {
            let Item3
            test("Tranfer 3 pcs from stock to shoppee",(done) => {
                Item.findByIdAndUpdate("5acb0c68de95b82495937ccd",
                {"$inc": { "quantity.shoppee" : 5, "quantity.stock" : -5 }},
                {new: true})
                .then((updateItem) => {
                    Item3 = updateItem
                    expect(updateItem).not.toBeNull
                    done()
                })
            })
            test("Quantity at shoppee == 5", (done) => {
                expect(Item3.quantity.shoppee).toEqual(5)
                done()
            })
            test("Quantity at stock == 13", (done) => {
                expect(Item3.quantity.stock).toEqual(13)
                done()
            })
        }) 
        describe("Create Shoppe Order :", () => {
            test("Create Success Order", (done) => {
                newOrder = new Order({
                    orderType: "shoppee",
                    userID: adminID,
                    postPriceID: postPriceData[1]._id,
                    tracking: "tracking 2"
                })
                newOrder.save()
                    .then((savedOrder) => {
                        adminOrderShoppeeID = savedOrder._id
                        expect(savedOrder.orderType).toEqual("shoppee")
                        expect(savedOrder.userID).toEqual(adminID)
                        done()
                    })
            })
             })
        })
        describe("Add Red Shirt : large :", () => {
            describe("add 5 pcs (use 1 lot)",() => {
                test("add item to order Complete", (done)=> {
                    Item.find(
                        { allQuantity : { $gte: 5 }, "quantity.shoppee" : { $gte: 5 }, _id: "5acb0c6ade95b82495937cce"}
                    )
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(5)
                        expect(findItem[0].quantity.shoppee).toBeGreaterThanOrEqual(5)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        const result = createItemsOrders(findItem, 5, 240)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(adminOrderShoppeeID)
                        findItem.allQuantity = findItem.allQuantity-5
                        findItem.quantity.shoppee = findItem.quantity.shoppee-5
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(1)
                        expect(obj.updatedItemStock.orders[0]).toEqual(adminOrderShoppeeID)
                        expect(obj.updatedItemStock.allQuantity).toEqual(10)
                        expect(obj.updatedItemStock.quantity.shoppee).toEqual(2)
                        expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(10)
                        return Order.findByIdAndUpdate( adminOrderShoppeeID,
                            { $addToSet: { items: { $each: obj.itemsOrders} } },
                            { new : true }
                        )
                        .then((updateOrder) => {
                            return(updateOrder)
                        })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(1)
                        expect(updateOrder.items[0].quantity).toEqual(5)
                        done()
                    })
                })
            })
        })
        describe("Add Yellow Shirt : xlarge :", () => {
            describe("add 8 pcs (use 1 lot)",() => {
                test("add item to order Complete", (done)=> {
                    Item.find(
                        { allQuantity : { $gte: 8 }, "quantity.shoppee" : { $gte: 8 }, _id: "5acb0c6ede95b82495937cd0"}
                    )
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(8)
                        expect(findItem[0].quantity.shoppee).toBeGreaterThanOrEqual(8)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        const result = createItemsOrders(findItem, 8, 300)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(adminOrderShoppeeID)
                        findItem.allQuantity = findItem.allQuantity-8
                        findItem.quantity.shoppee = findItem.quantity.shoppee-8
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(1)
                        expect(obj.updatedItemStock.orders[0]).toEqual(adminOrderShoppeeID)
                        expect(obj.updatedItemStock.allQuantity).toEqual(17)
                        expect(obj.updatedItemStock.quantity.shoppee).toEqual(2)
                        expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(17)
                        return Order.findByIdAndUpdate( adminOrderShoppeeID,
                            { $addToSet: { items: { $each: obj.itemsOrders} } },
                            { new : true }
                        )
                        .then((updateOrder) => {
                            return(updateOrder)
                        })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(2)
                        expect(updateOrder.items[1].quantity).toEqual(8)
                        done()
                    })
                })
            })
        })
        describe("Add Red Shirt : small:", () => {
            describe("add 5 pcs (use 2 lot)",() => {
                test("add item to order Complete", (done)=> {
                    Item.find(
                        { allQuantity : { $gte: 5 }, "quantity.shoppee" : { $gte: 5 }, _id: "5acb0c68de95b82495937ccd"}
                    )
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(5)
                        expect(findItem[0].quantity.shoppee).toBeGreaterThanOrEqual(5)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        const result = createItemsOrders(findItem, 5, 215)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(adminOrderShoppeeID)
                        findItem.allQuantity = findItem.allQuantity-5
                        findItem.quantity.shoppee = findItem.quantity.shoppee-5
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(2)
                        expect(obj.updatedItemStock.orders[1]).toEqual(adminOrderShoppeeID)
                        expect(obj.updatedItemStock.allQuantity).toEqual(13)
                        expect(obj.updatedItemStock.quantity.shoppee).toEqual(0)
                        expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(0)
                        expect(obj.updatedItemStock.stocks[1].watchQuantity).toEqual(13)
                        return Order.findByIdAndUpdate( adminOrderShoppeeID,
                            { $addToSet: { items: { $each: obj.itemsOrders} } },
                            { new : true }
                        )
                        .then((updateOrder) => {
                            return(updateOrder)
                        })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(4)
                        expect(updateOrder.items[2].quantity).toEqual(3)
                        expect(updateOrder.items[3].quantity).toEqual(2)
                        done()
                    })
                })
            })
        })
 
    describe("User ADD Stock Order send Ems",() => {
        test("Create Success Order", (done) => {
            newOrder = new Order({
                orderType: "stock",
                userID: userID,
                postPriceID: postPriceData[0]._id,
                tracking: "tracking 3"
            })
            newOrder.save()
                .then((savedOrder) => {
                    userOrderStockID = savedOrder._id
                    expect(savedOrder.orderType).toEqual("stock")
                    expect(savedOrder.userID).toEqual(userID)
                    done()
                })
        })
        describe("Add Green Pants : 36 incs :", () => {
            describe("add 10 pcs (use 1 lot)",() => {
                test("add item to order Complete", (done)=> {
                    Item.find(
                        { allQuantity : { $gte: 10 }, "quantity.stock" : { $gte: 10 }, _id: "5acb0c70de95b82495937cd1"}
                    )
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(10)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(10)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        const result = createItemsOrders(findItem, 10, findItem.price)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(userOrderStockID)
                        findItem.allQuantity = findItem.allQuantity-10
                        findItem.quantity.stock = findItem.quantity.stock-10
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(1)
                        expect(obj.updatedItemStock.orders[0]).toEqual(userOrderStockID)
                        expect(obj.updatedItemStock.allQuantity).toEqual(20)
                        expect(obj.updatedItemStock.quantity.stock).toEqual(20)
                        expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(20)
                        return Order.findByIdAndUpdate( userOrderStockID,
                            { $addToSet: { items: { $each: obj.itemsOrders} } },
                            { new : true }
                        )
                        .then((updateOrder) => {
                            return(updateOrder)
                        })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(1)
                        expect(updateOrder.items[0].quantity).toEqual(10)
                        done()
                    })
                })
            })
        })
        describe("Add Green Pants : 36 incs :", () => {
            describe("add 10 pcs (use 1 lot)",() => {
                test("add item to order Complete", (done)=> {
                    Item.find(
                        { allQuantity : { $gte: 20 }, "quantity.stock" : { $gte: 20 }, _id: "5acb0c71de95b82495937cd2"}
                    )
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(20)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(20)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        const result = createItemsOrders(findItem, 20, findItem.price)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(userOrderStockID)
                        findItem.allQuantity = findItem.allQuantity-20
                        findItem.quantity.stock = findItem.quantity.stock-20
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(1)
                        expect(obj.updatedItemStock.orders[0]).toEqual(userOrderStockID)
                        expect(obj.updatedItemStock.allQuantity).toEqual(15)
                        expect(obj.updatedItemStock.quantity.stock).toEqual(15)
                        expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(15)
                        return Order.findByIdAndUpdate( userOrderStockID,
                            { $addToSet: { items: { $each: obj.itemsOrders} } },
                            { new : true }
                        )
                        .then((updateOrder) => {
                            return(updateOrder)
                        })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(2)
                        expect(updateOrder.items[1].quantity).toEqual(20)
                        done()
                    })
                })
            })
        })
    })    
})




 function createItemsOrders(findItem, quantity, itemPrice){
     const stocks = findItem.stocks
     const sortStocks = _.orderBy(stocks, ['lotID'], ['ass'])
     const aviable = sortStocks
     let itemsOrdersID = []
     let newStocks = []
     let watchQuantity = quantity
     for(let i = 0; i < aviable.length; i++ ){
         if (watchQuantity == 0){
             break
         }
         if (aviable[i].watchQuantity > watchQuantity) {
             //console.log("Lot "+i+" "+aviable[i].watchQuantity+" watchQuntity"+watchQuantity)
             itemsOrdersID.push({
                itemID : findItem._id,
                lotID: aviable[i].lotID,
                quantity: watchQuantity,
                price: itemPrice,
                buyingPrice : aviable[i].price,
                transportPrice: aviable[i].transportCost,
                promoCode: findItem.promoCode
             }) 
             aviable[i].watchQuantity = aviable[i].watchQuantity - watchQuantity
             watchQuantity = 0          
         } else if (aviable[i].watchQuantity <= watchQuantity) {
            //console.log("Lot "+i+" "+aviable[i].watchQuantity+" watchQuntity"+watchQuantity)
            itemsOrdersID.push({
                itemID : findItem._id,
                lotID: aviable[i].lotID,
                quantity: aviable[i].watchQuantity,
                price: itemPrice,
                buyingPrice : aviable[i].price,
                transportPrice: aviable[i].transportCost,
                promoCode: findItem.promoCode
             }) 
            watchQuantity = watchQuantity - aviable[i].watchQuantity 
            aviable[i].watchQuantity = 0     
         }
     }
     const updateStock = findItem.stocks
     return {
        updateStock: updateStock,
        itemsOrders: itemsOrdersID
     }
 }

 function removeItemsOrders(resetItem, quantity){
    const stocks = resetItem.stocks
    let sortStocks = _.orderBy(stocks, ['lotID'], ['desc'])
    let watchQuantity = quantity
    for (let i = 0; i< sortStocks.length ; i++){
        const total = sortStocks[i].totalQuantity
        const watch = sortStocks[i].watchQuantity
        if (watchQuantity == 0){
            break
        }
        if (total == watch && total > 0){
            continue
        }
        if((total - watch) <= watchQuantity) {
            sortStocks[i].watchQuantity = sortStocks[i].watchQuantity+ (total - watch)
            watchQuantity = watchQuantity - (total - watch)
        }
        else if((total - watch) > watchQuantity){
            sortStocks[i].watchQuantity = sortStocks[i].watchQuantity + watchQuantity
            watchQuantity = 0
        }
    }
    const result = _.orderBy(sortStocks, ['lotID'], ['asc'])
    return result
 }
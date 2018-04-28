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
const WholeSalePrice = require('../../Models/WholeSalePrice')
const PriceHistory = require('../../Models/PriceHistory')
const WholeSaleHistory = require('../../Models/WholeSalesHistory')
const Promotion = require('../../Models/Promotion')
const PromoHistory = require('../../Models/PromoHistory')
// -----------------------------------------
// ------------ Mock Data -----------------
const MockData = require('./MockData/7_Promo-Whoresales-Orders/data')
const itemTypeData = MockData.itemType
const itemDomainData = MockData.itemDomain
const itemData = MockData.item
const lotData = MockData.lot
const postPriceData = MockData.postPrice
const orderData = MockData.order
const priceHistoryData = MockData.priceHistory
const userID = MockData.userID
const adminID = MockData.adminID
//--------------------------------------------
// ------------- Lib ------------------------
const OrderLib = require('../../Libs/Order')
//-------------------------------------------

let btwWholeSalePriceID = ""
let gteWholeSalePriceID = ""
let order4ID = ""

let promoPercentID = ""
let promoStaticID = ""
let order5ID = ""
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
                return Order.collection.insertMany(orderData)
            })
            .then((respond) => {
                return PriceHistory.collection.insertMany(priceHistoryData)
            })
            .then((respond) => {
                done()
            })
            .catch((err) => {
                console.log(err)
                done()
            })
    },60000)

    describe("add wholesale price to Yellow Shirt",() => {
        let yellowShirtID = ""
        test("check equal price", (done)=>{
            Item.find({itemDomainID: "5ac9adbd6d2ed7058ca801c7"})
            .then((findItems) => {
                const prices = findItems.map((item)=> { return item.price })
                const equalPrice = prices.filter((price) => { return price == prices[0] })
                expect(findItems.length).toEqual(2)
                expect(equalPrice.length).toBeLessThan(findItems.length)
                done()
            })
        })
        test("set item price of Yellow Shirt Domain", (done) => {
            Item.update(
                {itemDomainID: "5ac9adbd6d2ed7058ca801c7"},
                {
                    $set: {price: 250}
                },
                {multi: true}
            )
            .then((respond) => {
                //console.log(respond)
                expect(respond.nModified).toEqual(2)
            })
            .then(() => {
                return Item.find({itemDomainID: "5ac9adbd6d2ed7058ca801c7"})
                .then((findItems) => {
                    const prices = findItems.map((item)=> { return item.price })
                    const equalPrice = prices.filter((price) => { return price == prices[0] })
                    expect(findItems.length).toEqual(2)
                    expect(equalPrice.length).toEqual(findItems.length)
                })
            })
            .then(() => {
                const tmp = new PriceHistory({
                    itemID : mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf"),
                    price  : 250
                })
                return tmp.save()
            })
            .then(() => {
                const tmp = new PriceHistory({
                    itemID : mongoose.Types.ObjectId("5acb0c6ede95b82495937cd0"),
                    price  : 250
                })
                return tmp.save()
            })
            .then(() => {
                done()
            })
        })
        test("create wholesales price (orders 5 - 10 pcs)", (done) => {
            let newWholeSalePrice = new WholeSalePrice({
                type: "between",
                startQuantity: 5,
                endQuantity: 10,
                price: 230
            })
            newWholeSalePrice.save()
            .then((newWholeSale) => {
                btwWholeSalePriceID = newWholeSale._id
                expect(newWholeSale.type).toEqual("between")
                expect(newWholeSale.startQuantity).toEqual(5)
                expect(newWholeSale.endQuantity).toEqual(10)
                expect(newWholeSale.price).toEqual(230)
                const tmp = new WholeSaleHistory({
                    itemDomainID : mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
                    wholeSaleID : btwWholeSalePriceID,
                    price: 230
                })
                return tmp.save()
            })
            .then(() => {
                done()
            })
        })
        test("create wholesales price (orders >= 11 pcs)", (done) => {
            let newWholeSalePrice = new WholeSalePrice({
                type: "gte",
                startQuantity: 11,
                endQuantity: 1000000,
                price: 210
            })
            newWholeSalePrice.save()
            .then((newWholeSale) => {
                gteWholeSalePriceID = newWholeSale._id
                expect(newWholeSale.type).toEqual("gte")
                expect(newWholeSale.startQuantity).toEqual(11)
                expect(newWholeSale.endQuantity).toEqual(1000000)
                expect(newWholeSale.price).toEqual(210)
                const tmp = new WholeSaleHistory({
                    itemDomainID : mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
                    wholeSaleID : gteWholeSalePriceID,
                    price: 210
                })
                return tmp.save()
            })
            .then(() => {
                done()
            })
        })
        test("set wholsaleprices to itemdomain", (done) => {
            ItemDomain.findByIdAndUpdate(
                "5ac9adbd6d2ed7058ca801c7",
                {
                    $set: {haveWholeSalesPrice: true},
                    $push: { wholeSalePrices: { $each: [ btwWholeSalePriceID, gteWholeSalePriceID] } }
                },
                {new: true}
            )
            .then((updateItemDomain) => {
                expect(updateItemDomain.haveWholeSalesPrice).toEqual(true)
                expect(updateItemDomain.wholeSalePrices.length).toEqual(2)
                expect(updateItemDomain.wholeSalePrices[0]).toEqual(btwWholeSalePriceID)
                expect(updateItemDomain.wholeSalePrices[1]).toEqual(gteWholeSalePriceID)
                done()
            })
        })
    })
    describe("admin create order ems Yellow Shirt :",() => {
        describe("Create Stock Order :", () => {
            test("Create Done",(done) => {
                newOrder = new Order({
                    orderType: "stock",
                    userID: adminID,
                    postPriceID: postPriceData[0]._id,
                    tracking: "tracking 4"
                })
                newOrder.save()
                    .then((savedOrder) => {
                        order4ID = savedOrder._id
                        expect(savedOrder.orderType).toEqual("stock")
                        expect(savedOrder.userID).toEqual(adminID)
                        done()
                })
            })
        })
        describe("Add Yellow Shirt WholeSalePrice", () => {
            describe("Add Yellow Shirt : medium 6pcs",() => {
                test("add item to order Complete",(done) => {
                    Item.find(
                            { allQuantity : { $gte: 6 }, 
                            "quantity.stock" : { $gte: 6 }, 
                            _id: "5acb0c6bde95b82495937ccf"}
                        )
                    .populate({
                        path:'itemDomainID',
                        populate:{
                            path: 'wholeSalePrices'
                        }
                    })
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(6)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(6)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        itemPrice = OrderLib.findPrice(findItem,6)
                        expect(itemPrice).toEqual(230)
                        const result = OrderLib.createItemsOrders(findItem, 6, itemPrice)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(order4ID)
                        findItem.allQuantity = findItem.allQuantity-6
                        findItem.quantity.stock = findItem.quantity.stock-6
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                            expect(obj.updatedItemStock.orders.length).toEqual(2)
                            expect(obj.updatedItemStock.orders[1]).toEqual(order4ID)
                            expect(obj.updatedItemStock.allQuantity).toEqual(19)
                            expect(obj.updatedItemStock.quantity.stock).toEqual(19)
                            expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(0)
                            expect(obj.updatedItemStock.stocks[1].watchQuantity).toEqual(19)   
                            return Order.findByIdAndUpdate( order4ID,
                                { $addToSet: { items: { $each: obj.itemsOrders} } },
                                { new : true }
                            )
                            .then((updateOrder) => {
                                return(updateOrder)
                            })                     
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(2)
                        expect(updateOrder.items[0].quantity).toEqual(5)
                        expect(updateOrder.items[1].quantity).toEqual(1)
                        done()
                    })
                })
            })
            describe("Add Yellow Shirt : xlarge 11pcs",() => {
                test("add item to order Complete",(done) => {
                    Item.find(
                            { allQuantity : { $gte: 11 }, 
                            "quantity.stock" : { $gte: 11 }, 
                            _id: "5acb0c6ede95b82495937cd0"}
                        )
                    .populate({
                        path:'itemDomainID',
                        populate:{
                            path: 'wholeSalePrices'
                        }
                    })
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(11)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(11)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        itemPrice = OrderLib.findPrice(findItem,11)
                        expect(itemPrice).toEqual(210)
                        const result = OrderLib.createItemsOrders(findItem, 11, itemPrice)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(order4ID)
                        findItem.allQuantity = findItem.allQuantity-11
                        findItem.quantity.stock = findItem.quantity.stock-11
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                            //console.log(obj.itemsOrders)
                            expect(obj.updatedItemStock.orders.length).toEqual(2)
                            expect(obj.updatedItemStock.orders[1]).toEqual(order4ID)
                            expect(obj.updatedItemStock.allQuantity).toEqual(6)
                            expect(obj.updatedItemStock.quantity.stock).toEqual(4)
                            expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(6)  
                            return Order.findByIdAndUpdate( order4ID,
                                { $addToSet: { items: { $each: obj.itemsOrders} } },
                                { new : true }
                            )
                            .then((updateOrder) => {
                                return(updateOrder)
                            })                     
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(3)
                        expect(updateOrder.items[2].quantity).toEqual(11)
                        done()
                    })
                })
            })
        })
    })
    describe("Create Promotion: ",() => {
        describe("Create Promotion Percent :",() => {
            test("create promotion success",(done) => {
                let newPromotion= new Promotion({
                    type: "percent",
                    name: "sales 10%",
                    sale: 10,
                    active: true
                })
                newPromotion.save()
                .then((savePromotion) => {
                    promoPercentID = savePromotion._id
                    expect(savePromotion.name).toEqual("sales 10%")
                    expect(savePromotion.type).toEqual("percent")
                    expect(savePromotion.sale).toEqual(10)
                    expect(savePromotion.active).toEqual(true)
                    done()
                })
            })
        })
        describe("Create Promotion Static :",() => {
            test("create promotion success",(done) => {
                let newPromotion= new Promotion({
                    type: "static",
                    name: "static 100 bath",
                    sale: 100,
                    active: true
                })
                newPromotion.save()
                .then((savePromotion) => {
                    promoStaticID = savePromotion._id
                    expect(savePromotion.name).toEqual("static 100 bath")
                    expect(savePromotion.type).toEqual("static")
                    expect(savePromotion.sale).toEqual(100)
                    expect(savePromotion.active).toEqual(true)
                    done()
                })
            })
        })
        describe("Add Promotion Percent to Green Pants: 36 incs", () =>{
            test("add promotion Success", (done) => {
                Item.findByIdAndUpdate(
                    "5acb0c70de95b82495937cd1",
                    {$set:{promoCode : promoPercentID}},
                    {new: true}
                )
                .then((updateItem) => {
                    expect(updateItem.promoCode).toEqual(promoPercentID)
                    const tmp = new PromoHistory({
                        itemID : updateItem._id
                    })
                    return tmp.save()
                })
                .then(() => {
                    done()
                })
            })
        })
        describe("Add Promotion Static to Green Pants: 40 incs", () =>{
            test("add promotion Success", (done) => {
                Item.findByIdAndUpdate(
                    "5acb0c71de95b82495937cd2",
                    {$set:{promoCode : promoStaticID}},
                    {new: true}
                )
                .then((updateItem) => {
                    expect(updateItem.promoCode).toEqual(promoStaticID)
                    const tmp = new PromoHistory({
                        itemID : updateItem._id
                    })
                    return tmp.save()
                })
                .then(() => {
                    done()
                })
            })
        })
    })
    describe("admin create order ems Green Pants :", () => {
        describe("Create Stock Order :", () => {
            test("Create Done",(done) => {
                newOrder = new Order({
                    orderType: "stock",
                    userID: adminID,
                    postPriceID: postPriceData[1]._id,
                    tracking: "tracking 5"
                })
                newOrder.save()
                    .then((savedOrder) => {
                        order5ID = savedOrder._id
                        expect(savedOrder.orderType).toEqual("stock")
                        expect(savedOrder.userID).toEqual(adminID)
                        done()
                })
            })
        })
        describe("Add Green Pants Promotion", ()=> {
            describe("Add Green Pants 36 incs : Promotion Percent",() => {
                test("add item to order Complete", (done) => {
                    Item.find(
                            { allQuantity : { $gte: 2 }, 
                            "quantity.stock" : { $gte: 2 }, 
                            _id: "5acb0c70de95b82495937cd1"}
                        )
                    .populate({
                        path:'itemDomainID',
                        populate:{
                            path: 'wholeSalePrices'
                        }
                    })
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(2)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(2)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        itemPrice = OrderLib.findPrice(findItem,2)
                        expect(itemPrice).toEqual(400)
                        const result = OrderLib.createItemsOrders(findItem, 2, itemPrice)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(order5ID)
                        findItem.allQuantity = findItem.allQuantity-2
                        findItem.quantity.stock = findItem.quantity.stock-2
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(2)
                            expect(obj.updatedItemStock.orders[1]).toEqual(order5ID)
                            expect(obj.updatedItemStock.allQuantity).toEqual(18)
                            expect(obj.updatedItemStock.quantity.stock).toEqual(18)
                            expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(18) 
                            return Order.findByIdAndUpdate( order5ID,
                                { $addToSet: { items: { $each: obj.itemsOrders} } },
                                { new : true }
                            )
                            .then((updateOrder) => {
                                return(updateOrder)
                            })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(1)
                        expect(updateOrder.items[0].quantity).toEqual(2)
                        done()
                    })
                })
            })
            describe("Add Green Pants 40 incs : Promotion Static",() => {
                test("add item to order Complete", (done) => {
                    Item.find(
                            { allQuantity : { $gte: 3 }, 
                            "quantity.stock" : { $gte: 3 }, 
                            _id: "5acb0c71de95b82495937cd2"}
                        )
                    .populate({
                        path:'itemDomainID',
                        populate:{
                            path: 'wholeSalePrices'
                        }
                    })
                    .then((findItem) => {
                        expect(findItem.length).toEqual(1)
                        expect(findItem[0].allQuantity).toBeGreaterThanOrEqual(3)
                        expect(findItem[0].quantity.stock).toBeGreaterThanOrEqual(3)
                        return findItem[0]
                    })
                    .then((findItem) => {
                        itemPrice = OrderLib.findPrice(findItem,3)
                        expect(itemPrice).toEqual(450)
                        const result = OrderLib.createItemsOrders(findItem, 3, itemPrice)
                        //console.log(result)
                        findItem.stocks = result.updateStock
                        findItem.orders.push(order5ID)
                        findItem.allQuantity = findItem.allQuantity-3
                        findItem.quantity.stock = findItem.quantity.stock-3
                        return findItem.save()
                            .then((updatedItemStock)=> {
                                return {updatedItemStock : updatedItemStock,itemsOrders : result.itemsOrders}
                            })
                    })
                    .then((obj) => {
                        expect(obj.updatedItemStock.orders.length).toEqual(2)
                            expect(obj.updatedItemStock.orders[1]).toEqual(order5ID)
                            expect(obj.updatedItemStock.allQuantity).toEqual(12)
                            expect(obj.updatedItemStock.quantity.stock).toEqual(12)
                            expect(obj.updatedItemStock.stocks[0].watchQuantity).toEqual(12) 
                            return Order.findByIdAndUpdate( order5ID,
                                { $addToSet: { items: { $each: obj.itemsOrders} } },
                                { new : true }
                            )
                            .then((updateOrder) => {
                                return(updateOrder)
                            })
                    })
                    .then((updateOrder) => {
                        expect(updateOrder.items.length).toEqual(2)
                        expect(updateOrder.items[1].quantity).toEqual(3)
                        done()
                    })
                })
            })
        })
    })  
    describe("Order test: ",() => {
        describe("Order 1", () => {
            let Order1 = ""
            let AllQuantity
            let AllPostPrice
            let AllItemPrice
            test("Found Order1 ", (done) => {
                Order.find( {_id :"5ace45b6e284162bec2e4483"} )
                .populate("postPriceID")
                .populate({"path":"items.promoCode"})
                .then((foundOrder) => {
                    //console.log(foundOrder[0])
                    Order1 = foundOrder[0]
                    const result = OrderLib.calculatePrice(Order1)
                    AllQuantity = result.allQuantity
                    AllPostPrice = result.allPostPrice
                    AllItemPrice = result.sumItemsCost
                    expect(foundOrder.length).toEqual(1)
                    done()
                })
            })
            test("All of Quantity in orders is 22", (done) => {
                expect(22).toEqual(AllQuantity)
                done()
            })
            test("All of PostPrice in orders is 50+(21*10)", (done) => {
                expect(50+(21*10)).toEqual(AllPostPrice)
                done()
            })
            test("All of AllItemPrice in orders is 5000", (done) => {
                expect(5000).toEqual(AllItemPrice)
                done()
            })
        })
        describe("Order 2", () => {
            let Order1 = ""
            let AllQuantity
            let AllPostPrice
            let AllItemPrice
            test("Found Order1 ", (done) => {
                Order.find( {_id :"5ace45c0e284162bec2e4484"} )
                .populate("postPriceID")
                .populate({"path":"items.promoCode"})
                .then((foundOrder) => {
                    //console.log(foundOrder[0])
                    Order1 = foundOrder[0]
                    const result = OrderLib.calculatePrice(Order1)
                    AllQuantity = result.allQuantity
                    AllPostPrice = result.allPostPrice
                    AllItemPrice = result.sumItemsCost
                    expect(foundOrder.length).toEqual(1)
                    done()
                })
            })
            test("All of Quantity in orders is 18", (done) => {
                expect(18).toEqual(AllQuantity)
                done()
            })
            test("All of PostPrice in orders is 30+(17*10)", (done) => {
                expect(40 + 170 ).toEqual(AllPostPrice)
                done()
            })
            test("All of AllItemPrice in orders is 5000", (done) => {
                expect(4675).toEqual(AllItemPrice)
                done()
            })
        })
        describe("Order 3", () => {
            let Order1 = ""
            let AllQuantity
            let AllPostPrice
            let AllItemPrice
            test("Found Order1 ", (done) => {
                Order.find( {_id :"5ace45c3e284162bec2e4485"} )
                .populate("postPriceID")
                .populate({"path":"items.promoCode"})
                .then((foundOrder) => {
                    //console.log(foundOrder[0])
                    Order1 = foundOrder[0]
                    const result = OrderLib.calculatePrice(Order1)
                    AllQuantity = result.allQuantity
                    AllPostPrice = result.allPostPrice
                    AllItemPrice = result.sumItemsCost
                    expect(foundOrder.length).toEqual(1)
                    done()
                })
            })
            test("All of Quantity in orders is 18", (done) => {
                expect(30).toEqual(AllQuantity)
                done()
            })
            test("All of PostPrice in orders is 50+(29*10)", (done) => {
                expect(50 + 290 ).toEqual(AllPostPrice)
                done()
            })
            test("All of AllItemPrice in orders is 13000", (done) => {
                expect(13000).toEqual(AllItemPrice)
                done()
            })
        })
        describe("Order 4", () => {
            let Order1 = ""
            let AllQuantity
            let AllPostPrice
            let AllItemPrice
            test("Found Order1 ", (done) => {
                Order.find( {_id : order4ID} )
                .populate("postPriceID")
                .populate({"path":"items.promoCode"})
                .then((foundOrder) => {
                    //console.log(foundOrder[0])
                    Order1 = foundOrder[0]
                    const result = OrderLib.calculatePrice(Order1)
                    AllQuantity = result.allQuantity
                    AllPostPrice = result.allPostPrice
                    AllItemPrice = result.sumItemsCost
                    expect(foundOrder.length).toEqual(1)
                    done()
                })
            })
            test("All of Quantity in orders is 17", (done) => {
                expect(17).toEqual(AllQuantity)
                done()
            })
            test("All of PostPrice in orders is 50+(16*10)", (done) => {
                expect(50 + 160 ).toEqual(AllPostPrice)
                done()
            })
            test("All of AllItemPrice in orders is 3690", (done) => {
                expect(3690).toEqual(AllItemPrice)
                done()
            })
        })
        describe("Order 5", () => {
            let Order1 = ""
            let AllQuantity
            let AllPostPrice
            let AllItemPrice
            test("Found Order1 ", (done) => {
                Order.find( {_id : order5ID} )
                .populate({"path":"postPriceID"})
                .populate({"path":"items.promoCode"})
                .then((foundOrder) => {
                    //console.log(foundOrder[0])
                    Order1 = foundOrder[0]
                    const result = OrderLib.calculatePrice(Order1)
                    AllQuantity = result.allQuantity
                    AllPostPrice = result.allPostPrice
                    AllItemPrice = result.sumItemsCost
                    expect(foundOrder.length).toEqual(1)
                    done()
                })
            })
            test("All of Quantity in orders is 5", (done) => {
                expect(5).toEqual(AllQuantity)
                done()
            })
            test("All of PostPrice in orders is 40+(4*10)", (done) => {
                expect(40 + 40 ).toEqual(AllPostPrice)
                done()
            })
            test("All of AllItemPrice in orders is 1770", (done) => {
                expect(1770).toEqual(AllItemPrice)
                done()
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
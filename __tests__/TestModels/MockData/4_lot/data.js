const mongoose = require('mongoose')

exports.itemType = [
    {"_id":mongoose.Types.ObjectId("5ac8d09365231380596e8aa4")
        ,"name":"เสื้อเชิ้ต"
        ,"engName":"Shirt"
        ,"thName":"เสื้อเชิ้ต"
        ,"created": new Date("2018-04-11T15:57:24.983Z")
        ,"code":"SHT","__v":0},
    {"_id":mongoose.Types.ObjectId("5ac8d09365231380596e8aa5")
        ,"name":"กางเกง"
        ,"engName":"Pants"
        ,"thName":"กางเกง"
        ,"code":"PNT"
        ,"created": new Date("2018-04-11T15:57:25.994Z")
        ,"__v":0}
]

exports.itemDomain = [
    {"_id": mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"),
        "items":[mongoose.Types.ObjectId("5acb0c68de95b82495937ccd"),mongoose.Types.ObjectId("5acb0c6ade95b82495937cce")],
        "gallerys":["Type-shirt1_1.jpg","Type-shirt1_2.jpg","Type-shirt1_3.jpg"],
        "haveWholeSalesPrice":false,
        "wholeSalePrices":[],
        "name":"Red Shirt",
        "itemID":"SHT-000001",
        "created": new Date("2018-04-11T16:00:29.507Z"),
        "itemTypeID": mongoose.Types.ObjectId("5ac8d09365231380596e8aa4"),
        "__v":0},
    {"_id": mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
        "items":[mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf"),mongoose.Types.ObjectId("5acb0c6ede95b82495937cd0")],
        "gallerys":["Type-shirt2_1.jpg","Type-shirt2_2.jpg","Type-shirt2_3.jpg"],
        "haveWholeSalesPrice":false,
        "wholeSalePrices":[],
        "name":"Yellow Shirt",
        "itemID":"SHT-000002",
        "created": new Date("2018-04-11T16:00:30.634Z"),
        "itemTypeID": mongoose.Types.ObjectId("5ac8d09365231380596e8aa4"),
        "__v":0},
    {"_id": mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"),
        "items":[mongoose.Types.ObjectId("5acb0c70de95b82495937cd1"),mongoose.Types.ObjectId("5acb0c71de95b82495937cd2")],
        "gallerys":["Type-pants1_1.jpg","Type-pants1_2.jpg","Type-pants1_3.jpg"],
        "haveWholeSalesPrice":false,
        "wholeSalePrices":[],
        "name":"Green Pants",
        "itemID":"PNT-000001",
        "created": new Date("2018-04-11T16:00:31.657Z"),
        "itemTypeID": mongoose.Types.ObjectId("5ac8d09365231380596e8aa5"),
        "__v":0}      
]

exports.item = [
    {
        "_id": mongoose.Types.ObjectId("5acb0c68de95b82495937ccd"),
        "quantity":{"stock":0,"shoppee":0},
        "price":200,
        "allQuantity":0,
        "orders":[],
        "thName":"ขนาดเล็ก",
        "enName":"size s",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"),
        "stocks":[],
        "created": new Date("2018-04-11T16:05:45.005Z"),
        "__v":0},
    {
        "_id": mongoose.Types.ObjectId("5acb0c6ade95b82495937cce"),
        "quantity":{"stock":0,"shoppee":0},
        "price":220,
        "allQuantity":0,
        "orders":[],
        "thName":"ขนาดใหญ่",
        "enName":"size l",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"),
        "stocks":[],
        "created": new Date("2018-04-11T16:05:46.848Z"),
        "__v":0},
    {
        "_id": mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf"),
        "quantity":{"stock":0,"shoppee":0},
        "price":240,
        "allQuantity":0,
        "orders":[],
        "thName":"ขนาดกลาง",
        "enName":"size m",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
        "stocks":[],
        "created": new Date("2018-04-11T16:05:49.668Z"),
        "__v":0},
    {
        "_id": mongoose.Types.ObjectId("5acb0c6ede95b82495937cd0"),
        "quantity":{"stock":0,"shoppee":0},
        "price":260,
        "allQuantity":0,
        "orders":[],
        "thName":"ขนาดใหญ่พิเศษ",
        "enName":"size xl",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
        "created":  new Date("2018-04-11T16:05:51.252Z"),
        "stocks":[],"__v":0},
    {
        "_id": mongoose.Types.ObjectId("5acb0c70de95b82495937cd1"),
        "quantity":{"stock":0,"shoppee":0},
        "price":400,"allQuantity":0,
        "orders":[],
        "thName":"36 นิ้ว",
        "enName":"36 incs",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"),
        "stocks":[],
        "created": new Date("2018-04-11T16:05:52.804Z"),
        "__v":0},
    {
        "_id": mongoose.Types.ObjectId("5acb0c71de95b82495937cd2"),
        "quantity":{"stock":0,"shoppee":0},
        "price":450,
        "allQuantity":0,
        "orders":[],
        "thName":"40 นิ้ว",
        "enName":"40 incs",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"),
        "stocks":[],
        "created": new Date("2018-04-11T16:05:54.636Z"),
        "__v":0}
]






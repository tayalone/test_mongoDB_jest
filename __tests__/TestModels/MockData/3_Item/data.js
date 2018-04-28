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
        "items":[],
        "gallerys":["Type-shirt1_1.jpg","Type-shirt1_2.jpg","Type-shirt1_3.jpg"],
        "haveWholeSalesPrice":false,
        "wholeSalePrices":[],
        "name":"Red Shirt",
        "itemID":"SHT-000001",
        "created": new Date("2018-04-11T16:00:29.507Z"),
        "itemTypeID": mongoose.Types.ObjectId("5ac8d09365231380596e8aa4"),
        "__v":0},
    {"_id": mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
        "items":[],
        "gallerys":["Type-shirt2_1.jpg","Type-shirt2_2.jpg","Type-shirt2_3.jpg"],
        "haveWholeSalesPrice":false,
        "wholeSalePrices":[],
        "name":"Yellow Shirt",
        "itemID":"SHT-000002",
        "created": new Date("2018-04-11T16:00:30.634Z"),
        "itemTypeID": mongoose.Types.ObjectId("5ac8d09365231380596e8aa4"),
        "__v":0},
    {"_id": mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"),
        "items":[],
        "gallerys":["Type-pants1_1.jpg","Type-pants1_2.jpg","Type-pants1_3.jpg"],
        "haveWholeSalesPrice":false,
        "wholeSalePrices":[],
        "name":"Green Pants",
        "itemID":"PNT-000001",
        "created": new Date("2018-04-11T16:00:31.657Z"),
        "itemTypeID": mongoose.Types.ObjectId("5ac8d09365231380596e8aa5"),
        "__v":0}      
]


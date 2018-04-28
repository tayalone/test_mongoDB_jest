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
        "quantity": {"stock": 25,"shoppee": 0},
        "price": 200,
        "allQuantity": 25,
        "orders": [],
        "thName": "ขนาดเล็ก",
        "enName": "size s",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"),
        "stocks": [
            {
                "totalQuantity": 10,
                "watchQuantity": 10,
                "price": 100,
                "transportCost": 18.52,
                "lotID": mongoose.Types.ObjectId("5ace35cd5666161e30b69ebe"),
                "created": new Date("2018-04-11T16:20:29.748Z")
            },
            {
                "totalQuantity": 15,
                "watchQuantity": 15,
                "price": 125,
                "transportCost": 105.72,
                "lotID": mongoose.Types.ObjectId("5ace35d25666161e30b69ebf"),
                "created": new Date("2018-04-11T16:20:35.260Z")
            }
        ],
        "created": new Date("2018-04-11T16:05:45.005Z"),
        "__v": 0
    },
    {
        "_id": mongoose.Types.ObjectId("5acb0c6ade95b82495937cce"),
        "quantity": {"stock": 15, "shoppee": 0},
        "price": 220,
        "allQuantity": 15,
        "orders": [],
        "thName": "ขนาดใหญ่",
        "enName": "size l",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbc6d2ed7058ca801c6"),
        "stocks": [
            {
                "totalQuantity": 15,
                "watchQuantity": 15,
                "price": 120,
                "transportCost": 18.52,
                "lotID": mongoose.Types.ObjectId("5ace35cd5666161e30b69ebe"),
                "created": new Date("2018-04-11T16:20:30.362Z")
            }
        ],
        "created": new Date("2018-04-11T16:05:46.848Z"),
        "__v": 0
    },
    {
        "_id": mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf"),
        "quantity": {"stock": 40,"shoppee": 0},
        "price": 240,
        "allQuantity": 40,
        "orders": [],
        "thName": "ขนาดกลาง",
        "enName": "size m",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
        "stocks": [
            {
                "totalQuantity": 20,
                "watchQuantity": 20,
                "price": 140,
                "transportCost": 18.52,
                "lotID": mongoose.Types.ObjectId("5ace35cd5666161e30b69ebe"),
                "created": new Date("2018-04-11T16:20:30.976Z")
            },
            {
                "totalQuantity": 20,
                "watchQuantity": 20,
                "price": 180,
                "transportCost": 105.72,
                "lotID": mongoose.Types.ObjectId("5ace35d25666161e30b69ebf"),
                "created": new Date("2018-04-11T16:20:35.891Z")
            }
        ],
        "created": new Date("2018-04-11T16:05:49.668Z"),
        "__v": 0
    },
    {
        "_id": mongoose.Types.ObjectId("5acb0c6ede95b82495937cd0"),
        "quantity": {"stock": 25,"shoppee": 0},
        "price": 260,
        "allQuantity": 25,
        "orders": [],
        "thName": "ขนาดใหญ่พิเศษ",
        "enName": "size xl",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbd6d2ed7058ca801c7"),
        "created": new Date("2018-04-11T16:05:51.252Z"),
        "stocks": [
            {
                "totalQuantity": 25,
                "watchQuantity": 25,
                "price": 140,
                "transportCost": 18.52,
                "lotID": mongoose.Types.ObjectId("5ace35cd5666161e30b69ebe"),
                "created": new Date("2018-04-11T16:20:31.570Z")
            }
        ],
        "__v": 0
    },
    {
        "_id": mongoose.Types.ObjectId("5acb0c70de95b82495937cd1"),
        "quantity": {"stock": 30,"shoppee": 0},
        "price": 400,
        "allQuantity": 30,
        "orders": [],
        "thName": "36 นิ้ว",
        "enName": "36 incs",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"),
        "stocks": [
            {
                "totalQuantity": 30,
                "watchQuantity": 30,
                "price": 300,
                "transportCost": 18.52,
                "lotID": mongoose.Types.ObjectId("5ace35cd5666161e30b69ebe"),
                "created": new Date("2018-04-11T16:20:33.127Z")
            }
        ],
        "created": new Date("2018-04-11T16:05:52.804Z"),
        "__v": 0
    },
    {
        "_id": mongoose.Types.ObjectId("5acb0c71de95b82495937cd2"),
        "quantity": {"stock": 35,"shoppee": 0},
        "price": 450,
        "allQuantity": 35,
        "orders": [],
        "thName": "40 นิ้ว",
        "enName": "40 incs",
        "itemDomainID": mongoose.Types.ObjectId("5ac9adbf6d2ed7058ca801c8"),
        "stocks": [
            {
                "totalQuantity": 35,
                "watchQuantity": 35,
                "price": 350,
                "transportCost": 18.52,
                "lotID": mongoose.Types.ObjectId("5ace35cd5666161e30b69ebe"),
                "created": new Date("2018-04-11T16:20:33.729Z")
            }
        ],
        "created": new Date("2018-04-11T16:05:54.636Z"),
        "__v": 0
    }
]

exports.lot= [
    {
        "_id":mongoose.Types.ObjectId("5acb6af6b149fc7f7cf4f60c"),
        "costAll":33350,
        "transpotCostCn_Th":2000,
        "transpotCostTh_Th":500,
        "allQuantity":135,
        "costPerItem":18.52,
        "name":"Lot 1",
        "shippingName":"shipping numba one",
        "shippingTracking":"Tracking numba one",
        "created": new Date("2018-04-11T16:20:29.033Z"),
        "items":[
            {"price":100,"quantity":10,"itemID":mongoose.Types.ObjectId("5acb0c68de95b82495937ccd")},
            {"price":120,"quantity":15,"itemID":mongoose.Types.ObjectId("5acb0c6ade95b82495937cce")},
            {"price":140,"quantity":20,"itemID":mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf")},
            {"price":160,"quantity":25,"itemID":mongoose.Types.ObjectId("5acb0c6ede95b82495937cd0")},
            {"price":300,"quantity":30,"itemID":mongoose.Types.ObjectId("5acb0c70de95b82495937cd1")},
            {"price":350,"quantity":35,"itemID":mongoose.Types.ObjectId("5acb0c71de95b82495937cd2")}],
        "__v":0},
    {
        "_id":mongoose.Types.ObjectId("5acb6afcb149fc7f7cf4f60d"),
        "costAll":9175,
        "transpotCostCn_Th":3000,
        "transpotCostTh_Th":700,
        "allQuantity":35,
        "costPerItem":105.72,
        "name":"Lot 2",
        "shippingName":"shipping numba two",
        "shippingTracking":"Tracking numba tow",
        "created": new Date("2018-04-11T16:20:34.662Z"),
        "items":[
            {"price":125,"quantity":15,"itemID":mongoose.Types.ObjectId("5acb0c68de95b82495937ccd")},
            {"price":180,"quantity":20,"itemID":mongoose.Types.ObjectId("5acb0c6bde95b82495937ccf")}],
        "__v":0}
]



exports.postPrice = [
    {
        "_id": mongoose.Types.ObjectId("5acc322ac42c3b85ac2e8856"),
        "startPrice": 50,
        "perPrice": 10,
        "engName": "EMS",
        "thName": "ด่วนพิเศษ",
        "created": new Date("2018-04-11T16:14:52.030Z"),
        "__v": 0
    },
    {
        "_id": mongoose.Types.ObjectId("5acc322ac42c3b85ac2e8857"),
        "startPrice": 40,
        "perPrice": 10,
        "engName": "Register",
        "thName": "ลงทะเบียน",
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "__v": 0
    },
]

exports.userID = mongoose.Types.ObjectId("5acc369bbd1e6785ac7a71c4")
exports.adminID = mongoose.Types.ObjectId("5acc369bbd1e6785ac7a71c5")
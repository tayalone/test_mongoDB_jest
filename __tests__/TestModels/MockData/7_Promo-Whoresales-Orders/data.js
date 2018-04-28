const mongoose = require('mongoose')
const makeID = mongoose.Types.ObjectId
// mongoose.Types.ObjectId("")

exports.itemType = [
    {"_id":makeID("5ac8d09365231380596e8aa4")
        ,"name":"เสื้อเชิ้ต"
        ,"engName":"Shirt"
        ,"thName":"เสื้อเชิ้ต"
        ,"created": new Date("2018-04-11T15:57:24.983Z")
        ,"code":"SHT","__v":0},
    {"_id":makeID("5ac8d09365231380596e8aa5")
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

exports.item= [
    {
        "_id":makeID("5acb0c68de95b82495937ccd"),
        "quantity":{"stock":13,"shoppee":0},
        "price":200,"allQuantity":13,
        "orders":[
            makeID("5ace45b6e284162bec2e4483"),
            makeID("5ace45b6e284162bec2e4483")
        ],
        "thName":"ขนาดเล็ก",
        "enName":"size s",
        "itemDomainID":makeID("5ac9adbc6d2ed7058ca801c6"),
        "stocks":[
            {"totalQuantity":10,"watchQuantity":0,"price":100,"transportCost":18.52,"lotID":makeID("5ace35cd5666161e30b69ebe"),"created":new Date("2018-04-11T16:20:29.748Z")},
            {"totalQuantity":15,"watchQuantity":13,"price":125,"transportCost":105.72,"lotID":makeID("5ace35d25666161e30b69ebf"),"created":new Date("2018-04-11T16:20:35.260Z")}
        ],
        "created":new Date("2018-04-11T16:05:45.005Z"),
        "__v":2},
    {
        "_id": makeID("5acb0c6ade95b82495937cce"),
        "quantity":{"stock":8,"shoppee":2},
        "price":220,
        "allQuantity":10,
        "orders":[
            makeID("5ace45c0e284162bec2e4484")
        ],
        "thName":"ขนาดใหญ่",
        "enName":"size l",
        "itemDomainID":makeID("5ac9adbc6d2ed7058ca801c6"),
        "stocks":[
            {"totalQuantity":15,"watchQuantity":10,"price":120,"transportCost":18.52,"lotID":makeID("5ace35cd5666161e30b69ebe"),"created":new Date("2018-04-11T16:20:30.362Z")}
        ],
        "created":new Date("2018-04-11T16:05:46.848Z"),
        "__v":0},
    {
        "_id":makeID("5acb0c6bde95b82495937ccf"),
        "quantity":{"stock":25,"shoppee":0},
        "price":240,"allQuantity":25,"orders":
        [
            makeID("5ace45b6e284162bec2e4483")
        ],
        "thName":"ขนาดกลาง",
        "enName":"size m",
        "itemDomainID":makeID("5ac9adbd6d2ed7058ca801c7"),
        "stocks":[
            {"totalQuantity":20,"watchQuantity":5,"price":140,"transportCost":18.52,"lotID":makeID("5ace35cd5666161e30b69ebe"),"created":new Date("2018-04-11T16:20:30.976Z")},
            {"totalQuantity":20,"watchQuantity":20,"price":180,"transportCost":105.72,"lotID":makeID("5ace35d25666161e30b69ebf"),"created":new Date("2018-04-11T16:20:35.891Z")}
        ],
        "created": new Date("2018-04-11T16:05:49.668Z"),
        "__v":1},
    {
        "_id": makeID("5acb0c6ede95b82495937cd0"),
        "quantity":{"stock":15,"shoppee":2},
        "price":260,
        "allQuantity":17,
        "orders":[
            makeID("5ace45c0e284162bec2e4484")
        ],
        "thName":"ขนาดใหญ่พิเศษ",
        "enName":"size xl",
        "itemDomainID":makeID("5ac9adbd6d2ed7058ca801c7"),
        "created": new Date("2018-04-11T16:05:51.252Z"),
        "stocks":[
            {"totalQuantity":25,"watchQuantity":17,"price":140,"transportCost":18.52,"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T16:20:31.570Z")}
        ],
        "__v":0},
    {
        "_id":makeID("5acb0c70de95b82495937cd1"),
        "quantity":{"stock":20,"shoppee":0},
        "price":400,"allQuantity":20,
        "orders":[
            makeID("5ace45c3e284162bec2e4485")
        ],
        "thName":"36 นิ้ว",
        "enName":"36 incs",
        "itemDomainID":makeID("5ac9adbf6d2ed7058ca801c8"),
        "stocks":[
            {"totalQuantity":30,"watchQuantity":20,"price":300,"transportCost":18.52,"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T16:20:33.127Z")}
        ],
        "created": new Date("2018-04-11T16:05:52.804Z"),
        "__v":0},
    {
        "_id":makeID("5acb0c71de95b82495937cd2"),
        "quantity":{"stock":15,"shoppee":0},
        "price":450,
        "allQuantity":15,
        "orders":[
            makeID("5ace45c3e284162bec2e4485")
        ],
        "thName":"40 นิ้ว",
        "enName":"40 incs",
        "itemDomainID":makeID("5ac9adbf6d2ed7058ca801c8"),
        "stocks":[
            {"totalQuantity":35,"watchQuantity":15,"price":350,"transportCost":18.52,"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T16:20:33.729Z")}
        ],
        "created":new Date("2018-04-11T16:05:54.636Z"),
        "__v":0}, 
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

exports.order = [
    {
        "_id":makeID("5ace45b6e284162bec2e4483"),
        "tracking":"tracking 1",
        "orderType":"stock",
        "userID":makeID("5acc369bbd1e6785ac7a71c5"),
        "postPriceID":makeID("5acc322ac42c3b85ac2e8856"),
        "items":[
            {"quantity":7,"price":200,"buyingPrice":100,"transportPrice":18.52,"created": new Date("2018-04-11T17:28:28.446Z"),"itemID":makeID("5acb0c68de95b82495937ccd"),"lotID":makeID("5ace35cd5666161e30b69ebe")},
            {"quantity":15,"price":240,"buyingPrice":140,"transportPrice":18.52,"itemID":makeID("5acb0c6bde95b82495937ccf"),"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T17:28:31.327Z")}
        ],
        "created": new Date("2018-04-11T17:28:22.430Z"),
        "__v":3},
    {
        "_id":makeID("5ace45c0e284162bec2e4484"),
        "tracking":"tracking 2",
        "orderType":"shoppee",
        "userID":makeID("5acc369bbd1e6785ac7a71c5"),
        "postPriceID":makeID("5acc322ac42c3b85ac2e8857"),
        "items":[
            {"quantity":5,"price":240,"buyingPrice":120,"transportPrice":18.52,"itemID":makeID("5acb0c6ade95b82495937cce"),"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T17:28:33.435Z")},
            {"quantity":8,"price":300,"buyingPrice":140,"transportPrice":18.52,"itemID":makeID("5acb0c6ede95b82495937cd0"),"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T17:28:34.411Z")},
            {"quantity":3,"price":215,"buyingPrice":100,"transportPrice":18.52,"itemID":makeID("5acb0c68de95b82495937ccd"),"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T17:28:35.336Z")},
            {"quantity":2,"price":215,"buyingPrice":125,"transportPrice":105.72,"itemID":makeID("5acb0c68de95b82495937ccd"),"lotID":makeID("5ace35d25666161e30b69ebf"),"created": new Date("2018-04-11T17:28:35.335Z")}
        ],
        "created": new Date("2018-04-11T17:28:32.551Z"),
        "__v":0},
    {
        "_id":makeID("5ace45c3e284162bec2e4485"),
        "tracking":"tracking 3",
        "orderType":"stock",
        "userID":makeID("5acc369bbd1e6785ac7a71c4"),
        "postPriceID":makeID("5acc322ac42c3b85ac2e8856"),
        "items":[
            {"quantity":10,"price":400,"buyingPrice":300,"transportPrice":18.52,"itemID":makeID("5acb0c70de95b82495937cd1"),"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T17:28:36.543Z")},
            {"quantity":20,"price":450,"buyingPrice":350,"transportPrice":18.52,"itemID":makeID("5acb0c71de95b82495937cd2"),"lotID":makeID("5ace35cd5666161e30b69ebe"),"created": new Date("2018-04-11T17:28:37.482Z")}
        ],
        "created": new Date("2018-04-11T17:28:35.641Z"),
        "__v":0}
]

exports.postPrice = [
    {
        "_id": makeID("5acc322ac42c3b85ac2e8856"),
        "startPrice": 50,
        "perPrice": 10,
        "engName": "EMS",
        "thName": "ด่วนพิเศษ",
        "created": new Date("2018-04-11T16:14:52.030Z"),
        "__v": 0
    },
    {
        "_id": makeID("5acc322ac42c3b85ac2e8857"),
        "startPrice": 40,
        "perPrice": 10,
        "engName": "Register",
        "thName": "ลงทะเบียน",
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "__v": 0
    },
]

exports.priceHistory=[
    {
        "_id": makeID("5acecbf887aded34a58d48f8"),
        "itemID": makeID("5acb0c68de95b82495937ccd"),
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "price": 200,
        "__v": 0
    },
    {
        "_id": makeID("5acecbf887aded34a58d48f9"),
        "itemID": makeID("5acb0c6ade95b82495937cce"),
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "price": 220,
        "__v": 0
    },
    {
        "_id": makeID("5acecbf887aded34a58d48fb"),
        "itemID": makeID("5acb0c6bde95b82495937ccf"),
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "price": 240,
        "__v": 0
    },
    {
        "_id": makeID("5acecbf887aded34a58d48fc"),
        "itemID": makeID("5acb0c6ede95b82495937cd0"),
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "price": 260,
        "__v": 0
    },
    {
        "_id": makeID("5acc322ac42c3b85ac2e8857"),
        "itemID": makeID("5acb0c70de95b82495937cd1"),
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "price": 400,
        "__v": 0
    },
    {
        "_id": makeID("5acecbf887aded34a58d48fd"),
        "itemID": makeID("5acb0c71de95b82495937cd2"),
        "created": new Date("2018-04-11T16:14:52.439Z"),
        "price": 450,
        "__v": 0
    }
]

exports.userID = makeID("5acc369bbd1e6785ac7a71c4")
exports.adminID = makeID("5acc369bbd1e6785ac7a71c5")
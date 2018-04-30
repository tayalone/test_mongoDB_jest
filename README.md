# Test MongoDB with Jest

เป็น mini project ที่ทำขึ้นเพื่อทดสอบการออกแบบ **MongoDB** และเลือกใช้ Testing Framework คือ  **Jest** 

--------

**Before Start**

สร้าง File และ Folder ดังต่อไปนี้
```diff
Rootdir
│
+ └───Config
+	|	config.js
+	└───Env
+		|	development.js
+		|	test.js	 		
```

**config.js**
```diff
+ module.exports  =  require('./Env/'+process.env.NODE_ENV+'.js');
```
**development.js && test.js**
```diff
+ module.exports  = {
+	MONGO_URI :  "Your Mongo uri :)",
+	PORT :  "YOUR PORT",
+}
```
### `npm install`
เพื่อลง Dependency

### `npm run test`
เพื่อ test Models


## MongoSchema
ฐานข้อมูลนี้ถูกออกแบบโดยจำลองว่า ถ้าหากมีร้านขายเสื้อผ้าที่ต้องการเปิดหน้าร้าน และขายผ่านทางตัวกลาง (Shopee) ปัญหาที่เกิดขึ้นคือการเก็บข้อมูลเพื่อทำบัญชีค่อนข้างลำบากเนื่องจาก ราคาที่ขายหน้าร้านและราคาที่ขายผ่านตัวกลางไม่เท่ากัน และ ราคาสินค้าในแต่ล่ะ Lot ที่สั่งมาก็มีราคาไม่เท่ากัน ผู้จัดทำเลยใช้ nosql มาประยุกต์เพื่อแก้ปัญหาในการเก็บข้อมูลของปัญหานี้

**Model - ItemType**
เป็น Collection ที่เก็บประเภทของสินค้า เช่น เชื้อเชิ้ต, กางเกงขายาว หรือ กางเกงยีนส์ เป็นต้น
````
name: { type:  String,require:  true} ชื่อประเภทสินค้า,
engName: { type:  String, required:  true} ชื่อประเภทสินค้า(eng),
thName: { type:  String, required:  true} ชื่อประเภทสินค้า(th),
code: {type:  String,required:  true} ตัวย่อสินค้า เช่น เสื้อเชิ๊ต===SHT,
created: { type:  Date, default:  Date.now }
````
**Model - ItemDomain**
เป็น Collection ที่เก็บสินค้าเช่น เสื้อเชิ๊ตสีแดง, กางเกงสีเหลือง หรือรองเท้าสีดำเป็นต้น
````
itemID: {type: String,required: true},เป็นข้อมูลที่ประกอบด้วย codeของ ItemType + ด้วยจำนวนตัวเลข
name:{type: String,require: true} ชื่อของสินค้าหลัก,
itemTypeID: {type: Schema.Types.ObjectId,ref: 'item_type'}, document _id ของ ItemType
items:[{type: Schema.Types.ObjectId,ref: 'item'}], เก็บ document _id ของ Item ที่อยู่ภายใต้ไอเท็มหลัก
gallerys: [{type: String}], เก็บuri file รูปภาพ
haveWholeSalesPrice: {type: Boolean,default: false}, flag ที่ใช้ตรวจสอบว่าสินค้าหลักนี้มีราคาขายส่งหรือไม่
wholeSalePrices:[{type: Schema.Types.ObjectId,ref: 'whole_sale_price'}] ราคาขายส่งของสินค้าหลัก,
created: { type:  Date, default:  Date.now }
**** สินค้าหลักจะมีราคาขายส่งได้สินค้าที่ขึ้นกับสินค้าหลักจะต้องมีราคาเท่ากันทุกชิ้น
````
**Model - Item**
เป็นCollection ที่เก็บข้อมูลของสินค้าเช่น เสื้อสีแดงไซส์ s, เสื้อสีแดงไซส์ m, เสื้อสีแดงไซส์ L เป็นต้น
````
thName: {type: String,required: true},
enName: {type: String,required: true},
price: {type: Number,min: 0,default:  0}, ราคาขายสินค้า
itemDomainID: {type: Schema.Types.ObjectId,ref: "item_domain"},document _id ของ ItemDomain 
allQuantity: {type: Number,min: 0,default: 0}, สินค้าที่เหลือยู่ทั้งหมด
quantity: {
	stock: {type: Number,min: 0,default: 0}, สินค้าที่เหลือกับตัวเอง
	shoppee: {type: Number,min: 0,default: 0} สินค้าที่เหลือกับShoppee
},
stocks: [stocksSchema],เก็บข้อมูลการ Stock ของสินค้า
orders: [{type: Schema.Types.ObjectId,ref: "order"}] document _id ของ Order,
promoCode: {type: Schema.Types.ObjectId,ref: "promo_code"} document _id ของ Promotion Code,
created: { type: Date,default: Date.now }

stocksSchema {
_id:  false,
lotID: {type: Schema.Types.ObjectId,ref: "lot"} document _id ของ Lot,
totalQuantity: {type: Number,min: 0,default: 0} จำนวนสินค้าทั้งหมดจาก Lot,
watchQuantity: {type: Number,min: 0,default: 0} จำนวนสินค้าที่เหลือจาก Lot,
price: {type: Number,min: 0,default: 0} ราคาที่ซื้อ,
transportCost: {type: Number,min: 0,default: 0} ราคาค่าขนส่ง,
created: { type:  Date, default:  Date.now }
}
````

**Model - Lot**
เป็นCollection ที่เก็บข้อมูลการสั่งสินค้าเพื่อนำมาขาย
````
name: { type:  String, require:  true } ชื่อ Lot,
shippingName: { type:  String, required:  true} ชื่อบริษัทขนส่ง,
shippingTracking: { type:  String,required:  true } TrackingID,
costAll: { type:  Number,min:  0,default:0 } ค่าใช้จ่ายในการส่งทั้งหมด (บาท),
transpotCostCn_Th: { type:  Number,min:  0,default:0 } ค่าขนส่ง(หยวน),
transpotCostTh_Th: { type:  Number,min:  0,default:0 } ค่าขนส่ง(บาท),
allQuantity: { type:  Number,min:  0, default:0 } จำนวนสินค้าทั้งหมด,
costPerItem: { type:  Number,min:  0,default:0 } ค่าขนส่งต่อสินค้า1 ตัว,
items: [itemSchema],
created: { type:  Date, default:  Date.now }

itemSchema{
_id:  false,
itemID: { type:  Schema.Types.ObjectId, ref:  'item' } รหัสของสินค้า,
price: {type:  Number, min:0, default:0 } ราคาซื้อบาท,
quantity: {type:  Number, min:0, default:0 } จำนวนที่ซื้อ,
created: { type:  Date, default:  Date.now }
}
````

**Order Model**
เป็น Collection ที่เก็บข้อมูลการ Orderสินค้า
````
orderType: {type : String, enum: ["stock","shoppee"],} ประเภทของ orderคือสั่งของจาก shoppee หรือ stock,
userID: {type: Schema.Types.ObjectId, ref:"user"} document _id ของ userID,
items:[itemOrders],
postPriceID: {type: Schema.Types.ObjectId, ref:"post_price"} document _id ของ postPrice,
tracking: {type: String,default:  ""} tracking ของ order,
created: { type: Date,default: Date.now },
address: {type: String,default: "null"} ที่อยู่,
orderStatus: {type: String,enum:["ordered","success"],default: "ordered"
} สถาณะการส่งของ

itemOrders {
_id:  false,
itemID : {type:  Schema.Types.ObjectId, ref:"lot"} document _id ของ itemID,
lotID: {type:  Schema.Types.ObjectId, ref:"lot"} document _id ของ Lot,
quantity: {type:  Number,min:0, default:0} จำนวนสินค้าที่ขาย,
price: {type:  Number,min:0, default:0} ราคาที่ขาย,
buyingPrice : {type:  Number,min:0, default:0} ราคาที่ซื้อ,
transportPrice: {type:  Number,min:0, default:0} ราคาที่ซื้อ,
promoCode: {type:  Schema.Types.ObjectId,ref: "promo_code"} document _id ของ Promo,
created: { type:  Date, default:  Date.now }
}
````

**WholeSalePrice Model**
เป็น Collection ที่เก็บข้อมูลราคาขายส่งของ สินค้า
* เงื่อนไข : Item ที่ขึ้นอยู่กับ ItemDomain ต้องมีราคาเท่ากันทุกชิ้น
````
type: {type: String,enum: ["between", "gte"]} ประเภทของราคาขายส่ง มีสองประเภท ได้แก่ ซื้อสินค้าระหว่า a - b และซื้อสินค้ามากกว่า b,
startQuantity: {type: Number,min: 0,default: 0} เงื่อนไขจำนวนซื้อขั้นต่ำ,
endQuantity: {type: Number,min: 0,default: 0} เงื่อนไขจำนวนซื้อสูงสุด,
price: {type: Number,min:0, default:0} ราคา,
created: {type: Date,default: Date.now }
````

**Promotion Model**
เป็น Collection ที่เก็บข้อมูล Promotion ที่ใช้กับ Item
````
type: {type: String,enum: ["percent", "static"]} ประเภทของ Promotionมีสองประเภท คือลดเป็น percent กับลดตายตัว,
name: {type: String,default: ""} ชื่อPromotion,
sale: {type: Number,min: 0} จำนวนที่ลดสำหรับการ sale,
created: {type: Date, default: Date.now },
expired: {type: Date, default: Date.now }เวลา expr,
active: {type: Boolean, default: false} flag สำหรับ ตรวจสอบว่า promotion ยังใช้ได้หรือเปล่า
````
if ( process.env.NODE_ENV === undefined ){
    process.env.NODE_ENV = 'development';
}

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./Config/config')
const mongoose = require('mongoose');


mongoose.Promise = global.Promise 
mongoose.connect(config.MONGO_URI, (err) => {
    if (err) { console.log("Connection Errors : ",err) }
    else { console.log("Connect Complete") }
},10000)


const app = express()
app.use(cors())

if (process.env.NODE_ENV !== 'production'){
    app.use(morgan("combined"))
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const server = app.listen(config.PORT)

module.exports = server
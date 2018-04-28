const mongoose = require('mongoose')
const bcrypt = require('bcrypt-node')
const Schema = mongoose.Schema

const socialSchema = new Schema({
    _id: false,
    name: {type: String, enum:["facebook", "google"]},
    socialID : String
})

const userSchema = new Schema({
    fullname: { type: String,require: true},
    dob: { type: Date, default: new Date},
    email: { type: String,required: true},
    role: {
        type: "string",
        enum: ["user","admin"],
        default: "user",
        required: [true, "User Must Have role"]
    },
    created: { type: Date, default: Date.now },
    editDate: { type: Date, default: Date.now },
    password: String,
    salt: {
        type: "string",
        default: "asdasdsakdfsfaskdfasf"
    },
    providers: [socialSchema],
    tel: {type: String}
})

userSchema.pre('save', function (next) {
    //console.log("user schema presave",)
    let user = this
    //console.log("user schema presave",user)
    if (!user.password){
        return next()
    }
     bcrypt.genSalt(100 , function(err, salt) {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            user.password = hash
            user.salt = salt
        })
     })
    next()
})

userSchema.methods.comparePassword = function (oldPassword){
    const user = this
    const hash = user.password
    const res = bcrypt.compareSync(oldPassword, hash)
    return res
}

const User = mongoose.model('user',userSchema)

module.exports = User
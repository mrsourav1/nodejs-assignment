const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        // maxlength:7
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true});

module.exports = mongoose.model("User",userSchema)
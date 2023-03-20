const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    subtotal:{
        type:Number,
        required:true,
        default:0
    },
    mobile:{
        type:Number,
        required:true
    },
    item:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model('Order',orderSchema)
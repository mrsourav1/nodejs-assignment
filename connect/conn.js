const mongoose = require("mongoose")

uri = "mongodb+srv://hmwork:hmwork@cluster0.brbabej.mongodb.net/?retryWrites=true&w=majority"

const connect = ()=>{
    mongoose.set('strictQuery', false)

    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Db is connected")
    })
}

module.exports = connect;
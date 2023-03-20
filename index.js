const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const connect = require("./connect/conn.js")
const route = require('./routes/auth')
// const User = require('./models/userSchema.js')


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hellojhkkjsdf World!')
  })

app.use("/api/v1",route)


const start = async ()=>{
try{
    await connect()
    app.listen(port,()=>{
        console.log(`i am at ${port}`)
    });
}catch(error){
    console.log(error)
}
};
start();
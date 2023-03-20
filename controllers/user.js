const User = require('../models/userSchema.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Order = require('../models/order.js')


const register = async (req,res)=>{

    let userExist = await User.findOne({"email":req.body.email});
    console.log(userExist)
    if(userExist){
        res.status(401).json("already exist");
        return;
    }
    if ((req.body.mobile).toString().length != 10){
        res.status(401).json("Mobile should be lenght of 10")
        return;
    }
    let hashPassword = await bcrypt.hash(req.body.password,10);
    let response = new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:hashPassword,
    })
    await response.save()
    res.status(201).json(response)
}


const login = async(req,res)=>{
    try{

        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg:"User does not exist"})

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token = jwt.sign({id:user._id},"secret123");
        delete user.password
        res.status(200).json({token,user});
        console.log(token)

    }catch(err){
        res.status(500).json({ error:err.message })
        console.log(err)
    }
}


const createOrder = async (req,res)=>{
    try{
        console.log(req)
        const { userId,subtotal,item } = req.body;
        const user = await User.findById(userId);

        const newOrder = new Order({
            userId,
            mobile:user.mobile,
            subtotal,
            item,            
        })
        await newOrder.save()

        const order = await Order.find();
        res.status(201).json(order);

    }catch(err){
        res.status(409).json({message:err.message})
    }
}

const OrderDetails = async (req,res)=>{
    try{
        const { userId }  = req.params;
        const order = await Order.find({ userId });
        res.status(200).json(order);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

module.exports = { register,login,createOrder,OrderDetails };
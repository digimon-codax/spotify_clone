const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registerUser(req, res){
    
    const {username, email, password, role = "user"} = req.body

    const userExist = await userModel.findOne({

        $or: [
            {username},
            {email}
        ]

    })

    if(userExist){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)
       
    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

async function loginUser(req, res){
    const {username, email, password} = req.body
    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    const isPasswordValid = await bcrypt.compare(password, user.password)
}

module.exports = {registerUser}
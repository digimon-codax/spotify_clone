const musicModel = require("../models/music.model")
const {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken")

async function createMusic(req, res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "you don't have access to create a music"
            })
        }
    }catch(err){
            return res.status(401).json({
                message: "unauthorized"
            })
        }
        const {title} = req.body
        const uri = req.file.path
    
    

}


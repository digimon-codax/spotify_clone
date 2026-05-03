const musicModel = require('../models/music.moodels')
const jwt = require('jsonwebtoken')
const {uploadFile} = require('../services/storage.services')
const albumModel = require('../models/album.models')

async function addMusic(req, res){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({message: 'Unauthorized'})
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(decoded.role !== 'artist'){
      return res.status(403).json({message: "You don't have access to add music"})
    }
  
  const{title} = req.body
  const file = req.file

  const result = await uploadFile(file.buffer.toString('base64'))

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: decoded.id
  })
  res.status(201).json({
    message: 'Music added successfully', 
    music:{
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist
    }
  })
  }
  catch(err){
    console.log(err)
    return res.status(401).json({message: 'Unauthorized'})
  }

}

async function addMusicToAlbum(req, res){
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({message: 'Unauthorized'})
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(decoded.role !== 'artist'){
      return res.status(403).json({message: "You don't have access to add music to an album"})
    }

    const {title, musicIds} = req.body
    const album = await albumModel.create({
      title,
      artist: decoded.id,
      musics: musicIds
    })

    res.status(201).json({
      message: 'Album created successfully',
      album:{
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics
      }
    })
  }catch(err){
    console.log(err)
    return res.status(401).json({message: "Unauthorized"})
  }
}

module.exports = { addMusic, addMusicToAlbum }





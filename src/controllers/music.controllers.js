const musicModel = require('../models/music.moodels')
const jwt = require('jsonwebtoken')
const {uploadFile} = require('../services/storage.services')
const albumModel = require('../models/album.models')

async function addMusic(req, res){
  
  
  const{title, albumId} = req.body
  const file = req.file

  const result = await uploadFile(file.buffer.toString('base64'))

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id
  })

  if (albumId) {
    await albumModel.findByIdAndUpdate(albumId, { $push: { musics: music._id } })
  }

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

async function addMusicToAlbum(req, res){
  

    const {title, musicIds} = req.body
    const album = await albumModel.create({
      title,
      artist: req.user.id,
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
  
}

async function getAllMusics(req, res){
  const musics = await musicModel.find().limit(2).populate('artist', 'username')
  res.status(200).json({
    message: 'Musics retrieved successfully',
    musics: musics
  })
}

async function getAllAlbums(req, res){
  const albums = await albumModel.find().select("title artist").populate('artist', 'username')
  res.status(200).json({message: 'Albums retrieved successfully', albums: albums})
}

async function getAlbumById(req, res){
  const albumId = req.params.id
  const album = await albumModel.findById(albumId).populate('artist', 'username').populate('musics')
  return res.status(200).json({message: 'Album retrieved successfully', album: album})
}

module.exports = { addMusic, addMusicToAlbum, getAllMusics, getAllAlbums, getAlbumById} 





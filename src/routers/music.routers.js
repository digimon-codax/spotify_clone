const express = require('express')
const musicController = require('../controllers/music.controllers')
const multer = require('multer')
const authMiddleware = require('../middlewares/auth.middlewares')

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()
router.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.addMusic)
router.post('/album', authMiddleware.authArtist, musicController.addMusicToAlbum)
router.get('/get', musicController.getAllMusics)

module.exports = router
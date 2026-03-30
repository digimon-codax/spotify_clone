const express = require("express")
const musicControllers = require("../controllers/music.controllers")
const multer = require("multer")

const upload = multer({storage: multer.memoryStorage()})

const router = express.Router()

router.post("/create", upload.single("music"), musicControllers.createMusic)

module.exports = router
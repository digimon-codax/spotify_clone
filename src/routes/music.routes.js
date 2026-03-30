const express = require("express")
const musicControllers = require("../controllers/music.controllers")

const router = express.Router()

router.post("/create", musicControllers.createMusic)

module.exports = router
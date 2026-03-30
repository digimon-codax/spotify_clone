const {ImageKit} = require("@imagekit/nodejs")

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await ImageKitClient.files.upload({
        file,
        fileName: Date.now() + file.originalname,
        folder: "spotify"
    })

    return result
}

module.exports = {uploadFile}

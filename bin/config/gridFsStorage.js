const multer = require("multer");
const path = require("path");
const DB_URI = process.env.DB_URI
const GridFsStorage = require('multer-gridfs-storage')

const storage = new GridFsStorage({
    url: DB_URI,
    file: (req, file) => {
        return{
            filename: req.user.email + path.extname(file.originalname),
        }
    }
},);

const upload = multer({storage}).single("avatar")


exports.upload = upload
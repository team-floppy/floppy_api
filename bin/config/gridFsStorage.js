const multer = require("multer");
const path = require("path");
const DB_URI = process.env.DB_URI;
const GridFsStorage = require("multer-gridfs-storage");

const Profile_PIcture_Storage = new GridFsStorage({
  url: DB_URI,
  cache: '1',
  file: (req, file) => {
    return {
      filename: req.user.email + path.extname(file.originalname),
      bucketName: "profilePictures"
    };
  }
});

const Videos_Storage = new GridFsStorage({
  url: DB_URI,
  cache: '2',
  file: (req, file) => {
    if (file.mimeType === "video/mp4" || "video/mkv") {
      return {
        filename: file.originalname + path.extname(file.originalname),
        bucketName: "videos"
      };
    }else{
        return null
    }
  }
});

const uploadProfilePic = multer({ storage: Profile_PIcture_Storage }).single(
  "avatar"
);
const uploadVideo = multer({ storage: Videos_Storage }).single("video");

exports.uploadProfilePic = uploadProfilePic;
exports.uploadVideo = uploadVideo;

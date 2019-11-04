const videoService = require("../services/VideoService");
const { streamVideo } = require("../utils/gridfsStream");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = function() {
  this.uploadVideo = (req, res, next) => {
    console.log(req.file, req.user);
    const videoDetails = {
      fileName: req.body.fileName,
      username: req.user.username,
      videoId: req.file.id,
      videoTags: req.body.videoTags
    };
    videoService
      .uploadVideo(videoDetails)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  };

  this.deleteVideo = (req, res, next) => {
    videoService
      .deleteVideo(req.params.id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(error => {
        res.status(401).send(error);
      });
  };

  this.addView = (req, res, next) => {
    videoService
      .addView(req.params.id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(error => {
        res.status(200).send(error);
      });
  };

  this.streamvideo = (req, res) => {
    streamVideo(req.params.id, req.headers["range"])
      .then(result => {
        if (req.headers["range"]) {
          res.writeHead(206, {
            "Content-Range":
              "bytes " +
              result.start +
              "-" +
              result.end +
              "/" +
              result.filelength,
            "Accept-Ranges": "bytes",
            "Content-Length": result.chunksize,
            "Content-Type": result.fileContentType
          });
          result.gfs.pipe(res);
          result.gfs.on("end", () => {
            videoService
              .addView(req.params.id)
              .then(viewResult => {})
              .catch(error => {});
          });
        } else {
          res.header("Content-Length", result.contentLength);
          res.header("Content-Type", result.contentType);
          result.gfs.pipe(res);
          result.gfs.on("end", () => {
            videoService
              .addView(req.params.id)
              .then(viewResult => {
                console.log("Added");
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      })
      .catch(error => {
        res.send(error);
      });
  };
};

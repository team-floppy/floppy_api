const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const DB_URI = process.env.DB_URI;
const ObjectId = mongoose.Types.ObjectId;

let gfs = Grid;
const conn = mongoose.createConnection(DB_URI);
conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
});

exports.findallFiles = collectionName => {
  gfs
    .collection(collectionName)
    .find()
    .toArray(function(err, files) {
      if (err) {
        return err;
      } else {
        files.map(file => {
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png"
          ) {
            file.isPoster = true;
          } else {
            file.isPoster = false;
          }
        });
      }
      return files;
    });
};

exports.findOne = (id, collectionName) => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs
      .collection(collectionName)
      .find({
        id: Id
      })
      .toArray(function(err, file) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(err);
          resolve(file);
        }
      });
  });
};

exports.checkOneExist = (id, collectionName) => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs
      .collection(collectionName)
      .find({
        id: Id
      })
      .toArray(function(err, files) {
        if (err) {
          console.log(err);
          reject(false);
        } else if (!files || files == []) {
          console.log(files, "not files");
          reject(false);
        } else {
          console.log(files, "here");
          resolve(true);
        }
      });
  });
};

exports.getProfile = (id, collectionName) => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs.collection(collectionName).find({ _id: Id }, err => {
      if (err) {
        useruser;
        reject(err);
      } else {
        resolve(gfs.createReadStream(Id));
      }
    });
  });
};

exports.deleteOne = (id, collectionName) => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs.collection(collectionName).deleteOne(
      {
        _id: Id
      },
      err => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve("successfully removed");
        }
      }
    );
  });
};

exports.streamVideo = (id, headerRange) => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs.collection("videos").findOne({ _id: Id }, (err, file) => {
      if (err) {
        reject("Error streaming file");
      } else if (!file) {
        reject(
          "Could not find file the your looking for it either might have been removed"
        );
      } else {
        console.log(file);
        if (headerRange) {
          let parts = headerRange.replace(/bytes=/, "").split("-");
          var partialstart = parts[0];
          var partialend = parts[1];
          var start = parseInt(partialstart, 10);
          var end = partialend ? parseInt(partialend, 10) : file.length - 1;
          var chunksize = end - start + 1;

          resolve({
            gfs: gfs.createReadStream({
              _id: file._id,
              range: {
                startPos: start,
                endPos: end
              }
            }),
            start: start,
            end: end,
            chunksize: chunksize,
            filelength: file.length,
            fileContentType: file.contentType
          });
        } else {
          resolve({
            gfs: gfs.createReadStream({
              _id: file._id
            }),
            contentLength: file.length,
            contentType: file.contentType
          });
        }
      }
    });
  });
};

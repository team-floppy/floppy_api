const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const DB_URI = process.env.DB_URI;
const ObjectId = mongoose.Types.ObjectId;

let gfs = Grid;
const conn = mongoose.createConnection(DB_URI);
conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
});

exports.findallFiles = () => {
  gfs.files.find().toArray(function(err, files) {
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

exports.findOne = filename => {
  return new Promise((resolve, reject) => {
    gfs.files
      .find({
        filename: filename
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

exports.checkOneExist = filename => {
  return new Promise((resolve, reject) => {
    gfs.files
      .find({
        filename: filename
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

exports.getProfile = id => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs.files.find({ _id: Id }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(gfs.createReadStream(Id));
      }
    });
  });
};

exports.deleteOne = id => {
  let Id = new ObjectId(id);
  return new Promise((resolve, reject) => {
    gfs.files.deleteOne(
      {
        _id: Id
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve("successfully removed");
        }
      }
    );
  });
};

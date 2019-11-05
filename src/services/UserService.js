const model = require("../models/user");
const { deleteOne, getProfile } = require("../utils/gridfsStream");

function uploadProfilePic(fileDetails) {
  return new Promise((resolve, reject) => {
    if (!fileDetails) {
      reject({ success: false, message: "Unable to update Profile picture", err: "No file details is provided" });
    } else {
      model.findOneAndUpdate(
        { email: fileDetails.email },
        { profilePic: fileDetails.filename, profilePicID: fileDetails.id },
        (err, updated) => {
          if (err) {
            reject({
              success: false,
              message: "error updating profile picture mongoose"
            });
          } else {
            deleteOne(updated.profilePicID, 'profilePictures')
              .then(res => {
                resolve({
                  success: true,
                  message: "Profile picture updated",
                  data: null
                });
              })
              .catch(err => {
                reject({
                  success: false,
                  message: "error removing file from grid fs",
                  data: err
                });
              });
          }
        }
      );
    }
  });
}

exports.uploadProfilePic = uploadProfilePic;

function getProfilePicture(id) {
  return new Promise((resolve, reject) => {
    getProfile(id)
      .then(result => {
        resolve({
          success: true,
          message: result,
          data: null
        });
      })
      .catch(err => {
        reject({
          success: false,
          message: "Error from getting image",
          error: err
        });
      });
  });
}

exports.getProfilePicture = getProfilePicture;



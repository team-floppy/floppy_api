const model = require("../models/user");
const { deleteOne, getProfile } = require("../utils/gridfsStream");

function uploadProfilePic(fileDetails) {
  console.log(fileDetails)
  return new Promise((resolve, reject) => {
    if (!fileDetails) {
      reject({ success: false, message: "Unable to update Profile picture", err: "No file details is provided" });
    } else {
      model.findOneAndUpdate(
        { email: fileDetails.email },
        { profilePic: fileDetails.filename, profilePicID: fileDetails.id },
        (err, updated) => {
          if (err || !updated) {
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

function editProfile(userEmail, role, preference){
  return new Promise((resolve, reject) => {
    model
  .findOne({email:userEmail})
    .then(deUser => {
      if(!deUser){
        resolve({success: false, message: "User does not exist"})
      }else{
        console.log(preference)
        deUser.preference = preference;
        deUser.role = role;
        deUser.save();
        resolve({success: true, message: "Profie have been updated successfully"})
      }
    }).catch(err => {
      reject({success: false, message: "There was an error trying to update the user's profile", error: err})
    })
  })
}

exports.editProfile = editProfile;


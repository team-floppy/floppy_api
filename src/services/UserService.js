const model = require("../models/user");
const followModel = require("../models/follow");
const videoModel = require("../models/videos");
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

function followComedian(followerId, IdOfComedian) {
  return new Promise((resolve, reject) => {
    followModel
      .findOne({ comedian: IdOfComedian })
      .then(user => {
        if (!user) {
          model
            .findById(IdOfComedian)
            .then(comedian => {
              if (!comedian || comedian.role !== "comedian") {
                resolve({ success: false, message: "Comedian does not exist" });
              } else {
                model
                  .findById(followerId)
                  .then(user => {
                    if (!user) {
                      resolve({
                        success: false,
                        message: "User does not exist"
                      });
                    } else {
                      const followObj = {
                        comedian: IdOfComedian,
                        followers: [
                          {
                            userId: followerId
                          }
                        ]
                      };
                      followModel
                        .create(followObj)
                        .then(value => {
                          resolve({
                            success: true,
                            message:
                              "Comedian have been followed successfully 1"
                          });
                        })
                        .catch(err => {
                          reject({
                            success: false,
                            message:
                              "There was a problem following the comedian"
                          });
                        });
                    }
                  })
                  .catch(err => {
                    reject({
                      success: false,
                      message:
                        "There was an error trying to follow the comedian"
                    });
                  });
              }
            })
            .catch(err => {
              reject({
                success: false,
                message: "There was an error going to follow the comedian"
              });
              console.log(err);
            });
        } else {
          const alreadyAFollower = user.followers.find(
            elem => elem.userId.toString() == followerId
          );
          if (alreadyAFollower) {
            resolve({
              success: false,
              message: "Comedian have already been followed by this user"
            });
          } else {
            user.followers.push({ userId: followerId });
            user.save();
            resolve({
              success: true,
              message: "Comedian have been followed successfully"
            });
          }
        }
      })
      .catch(err => {
        reject({
          success: false,
          message: "There was an error trying to  follow the comedian"
        });
      });
  });
}
exports.followComedian = followComedian;



function unfollowComedian(comedianId, followerId){
  return new Promise((resolve, reject) => {
    if(!comedianId){
      resolve({success: false, message: "No comedian Id provided"})
    }else{
      model.findById(comedianId)
      .then(value => {
        if(value && value.role === "comedian"){
          followModel.findOne({comedian : comedianId})
          .then(value => {
            if(value){
              const deFollowerIndex = value.followers.findIndex(elem =>elem.userId == followerId)
              if(deFollowerIndex !== -1){
                value.followers.splice(deFollowerIndex, 1)
                value.save()
                resolve({success: true, message: "Comedian have been unfollowed successfully", data: null})
              }else{
                resolve({success: false, message: "User have not yet followed this comedian"})
              }
            }else{
              resolve({success: false, message: "User have not yet followed the comedian"})
            }
          }).catch(err => {
            console.log("ERROR----------------------")
            console.error(err)
            reject({success: false, message: "There was an error tring to unfollow this comedian 2"})
          })
        }else{
          resolve({success: false, message: "Comedian does not exist"})
        }
      }).catch(err => {
        console.log("ERROR----------------------")
        console.error(err)
        reject({success: false, message: "There was an error trying to unfollow this comedian 3",})
      })
    }
  })
}

exports.unfollowComedian = unfollowComedian


function getFollowers(comedianId) {
  return new Promise((resolve, reject) => {
    followModel
      .findOne({ comedian: comedianId })
      .select("followers -_id")
      .populate("followers.userId", "_id email role username")
      .then(followers => {
        if (followers) {
          resolve({
            success: true,
            message: "The comedian have followers",
            data: followers
          });
        } else {
          resolve({
            success: false,
            message: "The Comedian don't have any follower"
          });
        }
      })
      .catch(err => {
        reject({
          success: false,
          message: "Error Fetching getting comedian",
          error: err
        });
      });
  });
}

exports.getFollowers = getFollowers;

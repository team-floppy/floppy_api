const model = require("../models/user");
const followModel = require("../models/follow");

const { deleteOne, getProfile } = require("../../bin/config/gridfsStream");

function uploadProfilePic(fileDetails) {
  return new Promise((resolve, reject) => {
    if (!fileDetails) {
      reject({ success: false, message: "Unable to update Profile picture" });
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
            deleteOne(updated.profilePicID)
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
                              "There was a problem following the comedian 1"
                          });
                        });
                    }
                  })
                  .catch(err => {
                    reject({
                      success: false,
                      message:
                        "There was an error trying to follow the comedian 2"
                    });
                  });
              }
            })
            .catch(err => {
              reject({
                success: false,
                message: "There was an error going to follow the comedian 3"
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
              message: "Comedian have been followed successfully 2"
            });
          }
        }
      })
      .catch(err => {
        reject({
          success: false,
          message: "There was an error trying to  follow the comedian 4"
        });
      });
  });
}
exports.followComedian = followComedian;

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
        reject({ success: false, message: "" });
      });
  });
}

exports.getFollowers = getFollowers;

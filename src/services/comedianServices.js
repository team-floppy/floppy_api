const model = require("../models/user");
const followModel = require("../models/follow");
const bookModel = require("../models/book");


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
  
  function bookComedian(bookerId, comedianId, bookDetails){
    return new Promise((resolve, reject) => {
      if(!bookerId ||  !comedianId ||  !bookDetails){
        resolve({success: false, message: "Invalid inputs"});
      }else{
        model.findById({comedian: comedianId})
            .then(value => {
                if(value && comedianId.role == "comedian"){
                    bookModel.findById(comedianId)
                    .then(comedian => {
                        if(comedian){
                            comedian.books.push({
                                bookerId: bookerId, 
                                workType: bookDetails.workType,
                                description: bookDetails.description
                            })
                            comedian.save()
                        }else{
                            let book = new  bookModel({
                                comedian : comedianId, 
                                description: [
                                    {
                                        bookerId: bookerId,
                                        workType: bookDetails.workTYpe, 
                                        description: bookDetails.description
                                    }
                                ]
                            })
                            book.save().then(val => {
                                resolve({success: true, message: "Comedian have been booked already"})
                            }).catch(err => {
                                reject({success: false, message: "There was an error trying to book this comedian"})
                            })
                        }
                    }).catch(err => {
                        reject({success: false, message: "There was an error trying to follow this comedian"})
                    })
                }else{
                    reject({success: false, message: "Comedian does not exist"})
                }
            }).catch(err => {
                reject({success: false, message: "There was an error trying to beeok the comedian"})
            })
      }
    })
  }

exports.bookComedian = bookComedian
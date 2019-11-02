const model = require("../models/user");
const followModel = require('../models/follow');
const bcrypt = require("bcryptjs");

const { sendMail } = require("../utils/sendemail");
const { generateToken, verifyToken } = require("../utils/JWT");


exports.RegisterUser = Options => {
  return new Promise((resolve, reject) => {
    let hash = bcrypt.hashSync(Options.password, 10);
    const userdetails = {
      name: Options.name,
      username: Options.username.toLowerCase(),
      email: Options.email.toLowerCase(),
      password: hash,
      verificationCode: Options.verificationCode,
      verified: false,
      role: Options.role
    };
    model
      .findOne({
        $or: [{ email: userdetails.email }, { username: userdetails.username }]
      })
      .then(exists => {
        if (exists && exists.email == userdetails.email) {
          reject({
            success: false,
            message: "Sorry user with email already exists"
          });
        } else if (exists && exists.username == userdetails.username) {
          reject({
            success: false,
            message: "Sorry user with this username already exists"
          });
        } else {
          model
            .create(userdetails)
            .then(created => {
              let payload = {
                id: created._id,
                email: created.email,
                username: created.username
              };
              generateToken(payload).then((token) => {
                sendMail(userdetails, token)
                .then(res => {
                  console.log("verification mail sent")
                })
                .catch(err => {
                  console.log("Verification mail", err)
                });
              }).catch(err => {
                console.log("Generating token")
              })
            
              if (created) {
                resolve({
                  success: true,
                  message: "User Signup was successfull"
                });
              } else {
                resolve({
                  success: false,
                  message: "User Signup was not successfull"
                });
              }
            })
            .catch(err => {
              reject({
                success: false,
                message: err.message,
                data: null,
                error: err.errors
              });
            });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

function authenticateuser(username, password) {
  return new Promise((resolve, reject) => {
    if (username.length == 0 || password.length == 0) {
      resolve({ success: false, message: "Login credentials can't be empty" });
    } else {
      model
        .findOne({ username: username })
        .then(user => {
          if (!user) {
            resolve({ success: false, message: "user not found " });
          } else {
            if (user.verified == false) {
              resolve({
                success: false,
                message: "Please Verify your account "
              });
            } else {
              const validPassword = bcrypt.compareSync(password, user.password);
              if (validPassword) {
                getUserDetail(user).then(userdetail => {
                  generateToken(userdetail)
                    .then(token => {
                      resolve({
                        success: true,
                        data: userdetail,
                        token: token ,
                        message: "authentication successful"
                      });
                    })
                    .catch(err => {
                      resolve({
                        success: false,
                        data: err,
                        message: "could not authenticate user"
                      });
                    });
                });
              } else {
                resolve({
                  success: false,
                  message: "incorrect email or password"
                });
              }
            }
          }
        })
        .catch(err => {
          reject({ err });
        });
    }
  });
}
exports.authenticateuser = authenticateuser;

function getUserDetail(user) {
  return new Promise((resolve, reject) => {
    model
      .findOne({ _id: user._id }, { __v: 0, password: 0})
      .then(data => {
        const specificUserDetail = { email: data.email, username: data.username, id: data._id , role: data.role};
        resolve(specificUserDetail);
      })
      .catch(error => reject(error));
  });
}




function verifyAccount(token){
  return new Promise((resolve, reject) => {
    verifyToken(token)
      .then(decodedToken => {
        model.findById(decodedToken.id)
          .then(value => {
            if(value && value.verified == true){
              resolve({success: true , message: "User have already been verified"})
            }else{
              model.findByIdAndUpdate(decodedToken.id, {verified: true}, (err, updated) => {
                if(err){
                  reject({success: false,message: "Unable to update user"})
                }else{
                  resolve({success: true, message: "User have been verified", data : updated})
                }
              })
            }
          })
      })
      .catch(err=> {
        reject({success: false, message: "Invalid token", error: err});
      })
  })
}
exports.verifyAccount = verifyAccount


function followComedian(followerId, IdOfComedian) {
  return new Promise((resolve, reject) => {
      followModel.findOne({comedian: IdOfComedian})
        .then(user => {
          if(!user){
            model.findById(IdOfComedian)
              .then(comedian => {
                if(!comedian || comedian .role !== "comedian"){
                  resolve({success: false, message: "Comedian does not exist"})
                }else{
                  model.findById(followerId)
                    .then(user => {
                      if(!user){
                        resolve({success: false, message: "User does not exist"})
                      }else{
                        const followObj = {
                            comedian : IdOfComedian, 
                            followers: [
                              {
                                userId : followerId
                              }
                            ]
                        }
                        followModel.create(followObj).then(value => {
                          resolve({success: true, message: "Comedian have been followed successfully 1"})
                        }).catch(err => {
                          reject({success: false, message: "There was a problem following the comedian 1"})
                        })
                      }
                    }).catch(err => {
                      reject({success: false, message: "There was an error trying to follow the comedian 2"})
                    })
                }
              }).catch(err => {
                reject({success: false, message: "There was an error going to follow the comedian 3"})
                console.log(err)
              })
          }else{
            const alreadyAFollower = user.followers.find(elem => elem.userId.toString() == followerId); 
            if(alreadyAFollower){
              resolve({success: false , message: "Comedian have already been followed by this user"})
            }else{
              user.followers.push({userId: followerId});
              user.save();
              resolve({success: true, message: "Comedian have been followed successfully 2"})
            }
          }
        }).catch(err => {
          reject({success: false, message: "There was an error trying to  follow the comedian 4"})
        })
  })
}
exports.followComedian = followComedian


function getFollowers(comedianId){
  return new Promise((resolve, reject) => {
    followModel.findOne({comedian: comedianId})
    .select('followers -_id')
    .populate('followers.userId', "_id email role username")
    .then(followers => {
      if(followers){
        resolve({success: true, message:"The comedian have followers", data: followers})
      }else{
        resolve({success: false, message: "The Comedian don't have any follower"})
      }
    }).catch((err)=> {
    reject({success: false, message: ""})
    })
  })
}


exports.getFollowers = getFollowers

const model = require("../models/user");
const bcrypt = require("bcryptjs");

const {deleteOne, getProfile} = require("../../bin/config/gridfsStream")
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
              generateToken(payload)
                .then(token => {
                  sendMail(userdetails, token)
                    .then(res => {
                      console.log("verification mail sent");
                    })
                    .catch(err => {
                      console.log("Verification mail", err);
                    });
                })
                .catch(err => {
                  console.log("Generating token", err);
                });

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
                        token: token,
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
      .findOne({ _id: user._id }, { __v: 0, password: 0 })
      .then(data => {
        const specificUserDetail = {
          email: data.email,
          username: data.username,
          id: data._id,
          role: data.role
        };
        resolve(specificUserDetail);
      })
      .catch(error => reject(error));
  });
}

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
            deleteOne(updated.profilePicID).then(res => {
              resolve({
                success: true,
                message: "Profile picture updated",
                data: null
              });
            }).catch((err) => {
              reject({
                success: false,
                message: "error removing file from grid fs",
                data: err
              });
            })
           
          }
        }
      );
    }
  });
}

exports.uploadProfilePic = uploadProfilePic;


function getProfilePicture(id){
  return new Promise((resolve, reject) => {
    getProfile(id).then((result) => {
      resolve({
        success: true,
        message: result,
        data: null
      })
    }).catch((err) => {
      reject({
        success: false,
        message: "Error from getting image",
        error: err
      })
    })
  })
}

exports.getProfilePicture = getProfilePicture

function verifyAccount(token) {
  return new Promise((resolve, reject) => {
    verifyToken(token)
      .then(decodedToken => {
        model.findById(decodedToken.id).then(value => {
          if (value && value.verified == true) {
            resolve({
              success: true,
              message: "User have already been verified"
            });
          } else {
            model.findByIdAndUpdate(
              decodedToken.id,
              { verified: true },
              (err, updated) => {
                if (err) {
                  reject({ success: false, message: "Unable to update user" });
                } else {
                  resolve({
                    success: true,
                    message: "User have been verified",
                    data: updated
                  });
                }
              }
            );
          }
        });
      })
      .catch(err => {
        reject({ success: false, message: "Invalid token", error: err });
      });
  });
}

exports.verifyAccount = verifyAccount;

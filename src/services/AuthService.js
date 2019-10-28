const model = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendemail");

exports.RegisterUser = Options => {
  return new Promise((resolve, reject) => {
    let hash = bcrypt.hashSync(Options.password, 10);
    const userdetails = {
      name: Options.name,
      username: Options.username,
      email: Options.email,
      password: hash,
      verificationCode: Options.verificationCode,
      verified: false,
      role: Options.role
    };
    model
      .findOne({ email: userdetails.email })
      .then(exists => {
        if (exists) {
          reject({
            success: false,
            message: "Sorry user with email already exists"
          });
        } else {
          model
            .create(userdetails)
            .then(created => {
              sendMail(userdetails)
                .then(res => {})
                .catch(err => {});
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
                message: null,
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
        .findOne({ email: username }, "")
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
                getUserDetail(user, user.publicId).then(userdetail => {
                  generateToken(userdetail)
                    .then(token => {
                      resolve({
                        success: true,
                        data: { user, token: token },
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
          reject(err);
        });
    }
  });
}
exports.authenticateuser = authenticateuser;

exports.verifyAccount = (email, Token) => {
  return new Promise((resolve, reject) => {
    model
      .findOne({ $and: [{ email: email }, { verificationCode: Token }] })
      .then(data => {
        console.log(data);
        if (data) {
          const userId = data._id;
          model.findByIdAndUpdate({ _id: userId }, { verified: true }, function(
            err,
            updated
          ) {
            if (err)
              resolve({ status: false, message: "Error Verifying User" });
            resolve({ status: true, message: "User has been verified " });
          });
        } else {
          resolve({ status: false, message: "Invalid link !!!" });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

function getUserDetail(user, Id) {
  return new Promise((resolve, reject) => {
    model
      .findOne({ publicId: Id }, { _id: 0, __v: 0 })
      .then(data => {
        const specificUserDetail = {
          email: user.email,
          name: user.name,
          publicId: user.publicId
        };
        resolve(specificUserDetail);
      })
      .catch(error => reject(error));
  });
}

function generateToken(data = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign({ ...data }, secret, { expiresIn: "24hrs" }, function(err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

exports.generateToken = generateToken;

function verifyToken(token = "") {
  return new Promise((resolve, reject) => {
    jwt.verify(token.replace("Bearer", ""), secret, function(
      err,
      decodedToken
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
}
exports.verifyToken = verifyToken;

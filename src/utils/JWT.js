const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
function generateToken(data = {}) {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...data }, secret, { expiresIn: "7d" }, function(err, token) {
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
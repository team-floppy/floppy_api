const joi = require("joi");
const validator = require("../validators");
exports.authenticate = (req, res, next) => {
  //Logic for authentication goes in here
  const schema = {
    username: joi.string().min(3),
    password: joi.string()
  };
  const result = validator(req.body, schema);
  if (result)
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", error: result });
  next();
};

exports.authorize = (req, res, next) => {
  //Logic fot authorization goes in here
};

exports.signUp = (req, res, next) => {
  const schema = {
    name: joi.string().min(3),
    username: joi.string().min(3),
    role: joi.string(),
    email: joi.string().email(),
    password: joi.string(),
    preference: joi.string()
  };
  const result = validator(req.body, schema);
  if (result)
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", error: result });
  next();
};

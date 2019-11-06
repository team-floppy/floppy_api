const joi = require("joi");
const validator = require("../validators");
const {verifyToken} = require('../utils/JWT')



exports.authorizeViewer = (req, res, next) => {
  //Logic fot authorization goes in here
  const token = req.headers['x-access-token'];
  if(!token) return res.status(400).json({success: false, message: "No token provided"})
  verifyToken(token)
    .then(decodedToken => {
      if(decodedToken.role !== 'viewer') return res.status(401).json({success: false, message: "Access denied !!!"})
      const user = {email: decodedToken.email, id: decodedToken.id, username: decodedToken.username, role: decodedToken.role}
      req.user = user
      next()
    }).catch(err => {
      return res.status(401).json({success: false, message: 'Access denied!!', error : err.message})
    })
  
};

exports.authorizeComedian = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if(!token) return res.status(400).json({success: false, message: "No token provided"})
  verifyToken(token)
    .then(decodedToken => {
      if(decodedToken.role !== 'comedian') return res.status(401).json({success: false, message: "Access denied !!!"})
      const user = {email: decodedToken.email, id: decodedToken.id, username: decodedToken.username, role: decodedToken.role}
      req.user = user
      next()
    }).catch(err => {
      return res.status(401).json({success: false, message: 'Access denied!!', error : err.message})
    })
}

exports.authorizeAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if(!token) return res.status(400).json({success: false, message: "No token provided"})
  verifyToken(token)
    .then(decodedToken => {
      if(decodedToken.role !== 'admin') return res.status(401).json({success: false, message: "Access denied !!!"})
      const user = {email: decodedToken.email, id: decodedToken.id, username: decodedToken.username, role: decodedToken.role}
      req.user = user
      next();
    }).catch(err => {
      return res.status(401).json({success: false, message: 'Access denied!!', error : err.message})
    })
}

exports.authorizeAll = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if(!token) return res.status(400).json({success: false, message: "No token provided"})
  verifyToken(token)
    .then(decodedToken => {
      const user = {email: decodedToken.email, id: decodedToken.id, username: decodedToken.username, role: decodedToken.role}
      req.user = user
      next();
    }).catch(err => {
      return res.status(401).json({success: false, message: 'Access denied!!', error : err.message})
    })
}
exports.signUpValidator = (req, res, next) => {
  const schema = {
    name: joi.string().min(3).required(),
    username: joi.string().min(3).required(),
    role: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    preference: joi.string()
  };
  const result = joi.validate(req.body, schema);
  if (result.error)
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", error: result.error.message});
  next();
};

exports.signInValidator = (req, res, next) => {
  //Logic for authentication goes in here 
  const schema = {
    username: joi.string().min(3),
    password: joi.string()
  };
  const result = joi.validate(req.body, schema);
  if (result.error)
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", error: result.error.message });
  next();
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  
  username:{
    type: String,
    required: true, 
    unique: true
  },
  name: {
    type: String, 
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true, 
  },
  verificationCode:{
    type:Number,
  },
  verified: {
    type: Boolean,
	required: true,
    default: false
  },
  role: {
    type: String,
    enum : ['viewer', 'comedian', 'admin'],
    default: 'viewer'
  }, 
  profilePic:{
    type: String,
    default: "none"
  },
  profilePicID:{
    type: String,
    default: "none"
  },
  Date: {
    type: Date,
    default: Date()
  },
  verificationCode:{
    type: String,
  },
  preference: [String]
});


module.exports = mongoose.model("users", userSchema);

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
    unique: true
  },
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true, 
    unique: true
  },
  verificationCode:{
    type:Number,
    required:true,
  },
  verified: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("users", userSchema);

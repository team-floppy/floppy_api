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
    required:true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum : ['user', 'comedian', 'admin'],
    default: 'user'
  }, 
  preference: {
    type: String, 
    enum: ['cracks', 'anti-humor', 'black comedy', 'stand-up comedy', 'character comedy', 'improvisional comedy',
     'insult comedy', 'spoof', 'one-line joke', 'physical comedy', 'shock humor'],
     required: true
  }
});

module.exports = mongoose.model("users", userSchema);

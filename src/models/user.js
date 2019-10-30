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
    type: String
  },
  Date: {
    type: Date,
    default: Date()
  },
  verificationCode:{
    type: String,
  },
  prefernece: {
    type: String, 
    enum: ['cracks', 'anti-humor', 'black comedy', 'stand-up comedy', 'character comedy', 'improvisional comedy',
     'insult comedy', 'spoof', 'one-line joke', 'physical comedy', 'shock humor'],
  }
});

// userSchema.pre("save", (User) => {
//   console.log(User._id)
// })

module.exports = mongoose.model("users", userSchema);

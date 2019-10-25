const mongoose = require("mongoose");
Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verificationCode:{
    type:Number,
    required:true
  },
  verified: {
    type: Boolean,
	required: true,
    default: false
  },
  publicId:
  { type: mongoose.Types.ObjectId
    
  }
});

module.exports = mongoose.model("users", userSchema);

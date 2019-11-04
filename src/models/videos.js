const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoId: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  usersLikesId: {
    type: Array
  },
  uploadedBy: {
    type: String,
    required: true
  },
  uploadedDate: {
    type: Date,
    default: Date()
  },
  videoTags: {
    type: String,
    default: []
  }
});

module.exports = mongoose.model("Videos", videoSchema);

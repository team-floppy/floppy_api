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
  uploadedBy: {
    type: String,
    required: true
  },
  uploadedDate: {
    type: Date,
    default: Date()
  },
  videoTags: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("VideosDetail", videoSchema);

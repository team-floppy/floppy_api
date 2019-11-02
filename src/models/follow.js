const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const followSchema = new Schema({
  comedian: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  followers: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "users", required: true }
    }
  ],
  following: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "users", required: true }
    }
  ]
});
module.exports = mongoose.model("Follow", followSchema);

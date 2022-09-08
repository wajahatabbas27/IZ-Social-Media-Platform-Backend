const mongoose = require("mongoose");

//===============================================================
// Schema for the model of the database
// Model is created using the schema where we define types
//===============================================================
const Post = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // jo user post create krega uski id aegi idhr hmare pass
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", Post);

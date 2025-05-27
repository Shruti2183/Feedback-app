const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);

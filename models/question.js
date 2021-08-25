const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  title: { type: String, required: true, minLength: 3, trim: true },
  type: { type: String, required: true, minLength: 3, trim: true },
  options: { type: Array },
});

const Question = new mongoose.model("question", questionSchema);

module.exports = Question;

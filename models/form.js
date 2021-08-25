const mongoose = require("mongoose");
const Question = require("./question");

const formSchema = mongoose.Schema({
  title: { type: String, required: true, minLength: 3, trim: true },
  createdBy: { type: String, required: true, minLength: 3, trim: true },
  createdAt: { type: Date, required: true },
  questions: [Object],
});

const Form = new mongoose.model("form", formSchema);

module.exports = Form;

const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 10,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

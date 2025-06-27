const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
  },
});
module.exports = mongoose.model('Todo' ,TodoSchema);
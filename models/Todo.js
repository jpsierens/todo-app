const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const TodoSchema = new mongoose.Schema({
  name: String,
  completed: { type: Boolean, default: false },
  note: { type: String, default: '' },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);

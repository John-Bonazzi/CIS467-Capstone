const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Scehma
const QuestionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export let Question = mongoose.model('schema', QuestionSchema);

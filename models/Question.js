const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Scehma
const QuestionSChema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Question = mongoose.model('question', QuestionSChema);
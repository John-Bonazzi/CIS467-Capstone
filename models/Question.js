const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Scehma
const QuestionSchema = new Schema({
    tag: {
      type: String,
      required: true,
      unique: true, //Seems like this does not work properly with mongoose without dropDups
      dropDups: true //Fails any query that tries to store an element with tag value already existing in the database
    },
    question: {
      type: String,
      required: true
    },
    code: {
      type: String
    },
    answer: {
      type: Map,
      of: String, //For now, in the end it could be ObjectIDs
      required: true
    }
  });  

module.exports = Question = mongoose.model('question', QuestionSchema);
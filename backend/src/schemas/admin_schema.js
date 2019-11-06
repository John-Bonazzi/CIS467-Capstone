const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Create the schema;
   Eeach element in the schema is made up of:
   - tag: a human readable unique ID that will be used by the admin panel
     to extrapolate the ObjectID of an element.
   - question: the question passed to the front-end.
   - code: some kind of logic that has to be run to decide the next question.
     the code element is optional, as only complex questions would need it.
   - answer: a map of answers, answers can be one or more, and should have
     and objectID connected to them, or a keyword (TBD) to tell the program
     to evaluate the code stored in the item. In this case, the key is the answer.
     If that does not work, in the future it could be changed to a nested element (TBD).
*/
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
  }/*,
  code: {
    type: String
  },
  answer: {
    type: Map,
    of: String, //For now, in the end it could be ObjectIDs
    required: true
  }*/
},{
   collection: 'SCIS'
  });

module.exports = mongoose.model('schema', QuestionSchema);

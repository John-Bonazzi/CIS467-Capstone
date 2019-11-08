const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

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
    index: true //Make the tag a secondary index, which is unique and is queried faster.
  },
  question: {
    type: String,
    required: true
  },
  /*answers: [{
    body: String,
    link: Schema.Types.ObjectId
  }]
  ,
  code: {
    type: String
  },
  */
},{
   collection: 'SCIS'//,
   //strict: false
  });

module.exports = mongoose.model('schema', QuestionSchema);

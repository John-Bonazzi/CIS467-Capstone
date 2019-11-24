const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.Types.ObjectId;

mongoose.set('useCreateIndex', true);

/**
 * The contentSchema is a child schema for answerSchema.
 * It is used to enable multiple-choice answers.
 * This way, it is possible to select multiple answers (and store them for example), but still proceed to the next question.
 * - body: contains the answer to be displayed.
 * - _id: ObjectId that can be stored. (field not showed in the code).
 * @const {mongoose.Schema}
 */
const contentSchema = new Schema({
  body: {
    type: String,
    required: true,
  }
});

/**
 * The linkSchema is a child schema for answerSchema.
 * It is used to be able to reference elements in the database, and their collection.
 * - dbref: the ObjectID of the referenced element
 * - require: an array of ObjectIDs. This can be used in the front-end to set limitations, for example compare the list of saved answers (their content's _id) with the array, and if all elements in the array appear at least once in the saved list, then accept the answer and follow the link.
 * - type: a String that contains a keyword to reference a collection, and its mongoose.Schema. For example, at the end of the whole exploration bot execution, something else that is not a question is displaied; that will be stored in a different collection, using a different schema.
 * @const {mongoose.Schema}
 */
const linkSchema = new Schema({
  dbref: {
    type: ObjectID,
    required: true,
  },
  require: {
    type: [ObjectID],
    //required: true,
  },
  type: {
    type: String,
    required: true
  },
}, { _id: false});

/**
 * Create the child schema for the answer field.
 * Consideration: if the link array has multiple links with the same exact requirements, only one will be chosen, probably the first one found. This is an undefined behavior as per requirements, so it is not actively handled by the server, but passively by the database.
 * Each element in the schema is made up of:
 * - content: an array of contentSchema elements. see contentSchema for description.
 * - link: an array of linkSchema elements. see linkSchema for description.
 * @const {mongoose.Schema}
 * @see contentSchema
 * @see linkSchema
 */
const answerSchema = new Schema({
  content: {
    type: [contentSchema],
    required: true,
  },
  link: {
    type: [linkSchema],
    required: true,
  },
}, { _id: false });

/**
 *  Create the parent schema;
 *  Each element in the schema is made up of:
 *  - tag: a human readable unique ID that will be used by the admin panel
 *    to extrapolate the ObjectID of an element.
 *  - question: the question passed to the front-end.
 *  - answer: see answerSchema
 * @const {mongoose.Schema}
 * @see answerSchema
 */
const QuestionSchema = new Schema({
  tag: {
    type: String,
    required: true,
    index: true, // Make the tag a secondary index, which is unique and is queried faster.
  },
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [answerSchema],
    required: true,
  }
}, {
  collection: 'SCIS',
});

module.exports = mongoose.model('schema', QuestionSchema);

/**
 * The module contains the definition of a schema for the database element 'question'.
 * @module schemas/admin/question_schema
 * @requires mongoose
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.Types.ObjectId;

mongoose.set('useCreateIndex', true);

/**
 * The <code>contentSchema</code> is a child schema for <code>answerSchema</code>.
 * It is used to enable multiple-choice answers.
 * This way, it is possible to select multiple answers (and store them for example), but still proceed to the next question.
 * The fields are: <ul>
 * <li><code>body</code>: contains the answer to be displayed.</li>
 * <li><code>id</code>: String that can be stored, similar to the tag.</li></ul>
 * @const {mongoose.Schema}
 */
const contentSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

/**
 * The <code>linkSchema</code> is a child schema for <code>answerSchema</code>.
 * It is used to be able to reference elements in the database, and their collection.
 * The fields are: <ul>
 * <li><code>dbref</code>: the tag of the referenced element.</li>
 * <li><code>require</code>: an array of <code>ObjectID</code>s. This can be used in the front-end to set limitations, for example compare the list of saved answers (their content's <code>_id</code>) with the array, and if all elements in the array appear at least once in the saved list, then accept the answer and follow the link.</li>
 * <li><code>type</code>: a String that contains a keyword to reference a collection, and its <code>mongoose.Schema</code>. For example, at the end of the whole exploration bot execution, something else that is not a question is displaied; that will be stored in a different collection, using a different schema.</li></ul>
 * @const {mongoose.Schema}
 */
const linkSchema = new Schema({
  dbref: {
    type: String,
    required: true,
  },
  require: {
    type: [String],
    //required: true,
  },
  type: {
    type: String,
    required: true
  },
});

/**
 * Create the child schema for the <code>answer</code> field.<br>
 * <strong>Consideration</strong>: if the link array has multiple links with the same exact requirements, only one will be chosen, probably the first one found. This is an undefined behavior as per requirements, so it is not actively handled by the server, but passively by the database.<br>
 * Each element in the schema is made up of:<ul>
 * <li><code>content</code>: an array of <code>contentSchema</code> elements.</li>
 * <li><code>link</code>: an array of <code>linkSchema</code> elements.</li></ul>
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
});

/**
 *  Create the parent schema.<br>
 *  Each element in the schema is made up of:<ul>
 *  <li><code>tag</code>: a human readable unique ID that will be used to reference the element.<br> similar to the <code>_id</code> generated, but it is static; if the element is deleted from the database, and an exact copy of it is created, the <code>tag</code> will be the same, but the <code>_id</code> could differ, causing problem to the references using the <code>_id</code>.</li>
 *  <li><code>question</code>: the question passed to the front-end.</li>
 *  <li><code>answer</code>: an array of <code>answerSchema</code>.</li></ul>
 * @const {mongoose.Schema}
 * @see answerSchema
 */
const QuestionSchema = new Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
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
  collection: 'SCIS - Questions' //Delete/change this part if you want to use a different collection.
});

module.exports = mongoose.model('question_schema', QuestionSchema);

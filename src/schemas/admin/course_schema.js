/**
 * The module contains the definition of a schema for the database element 'course'.
 * @module schemas/admin/course_schema
 * @requires mongoose
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

/**
 *  Create the course schema.<br>
 *  Each element in the schema is made up of:<ul>
 *  <li><code>tag</code>: a human readable unique ID that will be used by the admin panel to extrapolate the <code>ObjectID</code> of an element. It will be also used as its displayed name.</li>
 *  <li><code>description</code>: a brief description of the course.</li>
 *  <li><code>href</code>: the link to the course catalog.</li></ul>
 * @name CourseSchema
 * @const {mongoose.Schema}
 */
const CourseSchema = new Schema({
    tag: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: String,
    href: {
        type: String,
        required: true
    }
}, {
    collection: 'SCIS - Courses'//Delete/change this part if you want to use a different collection.
    });

module.exports = mongoose.model('course_schema', CourseSchema);


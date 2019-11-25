const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

/**
 *  Create the course schema;
 *  Each element in the schema is made up of:
 *  - tag: a human readable unique ID that will be used by the admin panel to extrapolate the ObjectID of an element. It will be also used as its displayed name
 *  - description: a brief description of the course.
 *  - href: the link to the course catalog.
 * @name CourseSchema
 * @const {mongoose.Schema}
 */
const CourseSchema = new Schema({
    tag: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    href: {
        type: String,
        required: true
    }
}, {collection: 'SCIS - Courses'});

module.exports = mongoose.model('course_schema', CourseSchema);


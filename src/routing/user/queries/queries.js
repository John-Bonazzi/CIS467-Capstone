/**
 * The module contains a set of provided short hand mongoose query calls.
 * The queries provided should be used by the user side of the front-end.
 * @module routing/user/queries/queries
 */

/********************************************************
* GET QUERIES
********************************************************/

/**
 * The query looks for the element with the given tag.
 * This should be used for all communication with the server.
 * However, if there is a need to query the database by the <code>_id</code>, see <code>getOneElementById</code>
 * @param {mongoose.Schema} database the database as defined in a mongoose schema 
 * @param {json} tag the tag is the search term used for the query, an arbitrary value used to start the whole chatbot.
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the database element returned by the query.
 * @see getOneElementById
 */
function getOneElement(database, tag, selectTerm, callback){
  var e = null;
  database.findOne(tag, selectTerm, function(err, element){
    if (err) e = 'Unable to find element';
    callback(e, element);
    });
}

/**
 * The query looks at the database for the given ObjectId.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema 
 * @param {mongoose.ObjectId} id hexadecimal number used by MongoDB as the main index of a collection.
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the database element returned by the query.
 */
function getOneElementById(database, id, selectTerm, callback){
  var e = null;
  database.findById(id, selectTerm, function(err, element){
    if (err) e = 'Unable to find element';
    callback(e, element);
    });
}

module.exports = {
    getOneElement: getOneElement,
    getOneElementById: getOneElementById
}
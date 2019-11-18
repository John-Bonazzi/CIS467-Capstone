const error_handler = require('../../../error_handling/Error');

/********************************************************
* GET QUERIES
********************************************************/

/**
 * The query looks for the element with the given tag.
 * It differs from getOneElement because this query gets
 * the current element, not the linked element.
 * This should be used to start a connection between a user and
 * the server.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema 
 * @param {json} tag the tag is the search term used for the query, an arbitrary value used to start the whole chatbot.
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @callback callback callback to manage the response from the server
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the database element returned by the query.
 */
function getInitElement(database, tag, selectTerm, callback){
    var e = null;
    database.findOne(tag, selectTerm,function(err, element){
        if (err) e = 'Unable to find element';
        callback(e, element);
    });
}

/**
 * The query looks at the database for the given ObjectId.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema 
 * @param {mongoose.ObjectId} id hexadecimal number used by MongoDB as the main index of a collection.
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @callback callback callback to manage the response from the server
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the database element returned by the query.
 */
function getOneElement(database, id, selectTerm, callback){
    var e = null;
    database.findById(id, selectTerm, function(err, element){
        if (err) e = 'Unable to find element';
        callback(e, element);
    });
}

module.exports = {
    getInitElement: getInitElement,
    getOneElement: getOneElement
}
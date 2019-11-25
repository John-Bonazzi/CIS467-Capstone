/********************************************************
* POST QUERIES
********************************************************/

/**
 * The query takes a database entry in the form of a mongoose Schema object, and inserts it into the database.
 * If an error occurs, 'e' will be set to true.
 * Generally, this means that the server was not able to save on the database, most of the time because another element with the same unique key is in the database.
 * @param {mongoose.Schema} newElement a Schema object containing the entry to insert in the database 
 * @callback callback callback to manage the response from the server
 * @param {?bool} callback.e an error message, null if there is no error 
 */
function postOneElement(newElement, callback){
  var e = null;
  newElement.save(function(err){
    if (err) {
      //console.log(err);
      e = true;
    }
    callback(e);
  });
}

/**
 * The query takes an array of documents to save in the database.
 * The query runs the mongoose schema validators for each entry, and saves to the database all entries that pass the validators.
 * The storing of the documents is done in bulk, with only one operation.
 * If ordered = false, then the error will reports all the documents that have failed the validators. If true, stop the operation at the first document that fails the validators, not saving anything on the database.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json[]} newElementArr an array of populated Schema objects, each containing a document to save to the database.
 * @callback callback callback to manage the response from the server
 * @param {?bool} callback.err an error message, false if there is no error  
 */
function postManyElements(database, newElementArr, callback){
  database.insertMany(newElementArr, {options: {ordered: false}}, function(err, docs){
    callback(err);
  });
}

/********************************************************
* GET QUERIES
********************************************************/

/**
 * The query gets a single element from the database, found using the searchTerm value.
 * If an error occurs, 'e' will be set to true.
 * Generally, an error means that the element was not found in the database.
 * This error does not account for connectivity issues, or for other internal server errors.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @callback callback callback to manage the response from the server
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the database element returned by the query.
 */
function getOneElement(database, searchTerm, selectTerm, callback){
  var e = null;
  database.findOne(searchTerm, selectTerm, function(err, element){
    if (err) e = 'Unable to find element';
    callback(e, element);
  });
}

/**
 * The query gets all elements in the database.
 * If an error occurs, 'e' will be set to true.
 * Generally, an error means that the server had a problem.
 * It does not return an error in the case the database is empty, as 'empty' is a valid response to querying all elements.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @callback callback callback to manage the response from the server
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the database element returned by the query.
 */
function getAllElements(database, callback){
  var e = null;
  database.find({}, function(err, element){
      if (err) e = 'Unable to complete request';
      callback(e, element);
  });
}

/********************************************************
* PUT QUERIES
********************************************************/

/**
 * The query updates/adds a field, or more, in an existing element.
 * If an error occurs, 'e' will be set to true.
 * Generally, that means that the element was not found, or the update does not pass the database's constraints.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {json} update JSON containing the field(s) to update/add
 * @callback callback callback to manage the response from the server
 * @param {?string} callback.e an error message, null if there is no error
 * @param {json} callback.element the updated database element.
 */
function updateOneElement(database, searchTerm, update, callback){
  var e = null;
  database.findOneAndUpdate(searchTerm, update, {new: true, runValidators: true}, function(err, element) {
    if (err) e = 'Could not update element.';
    else callback(e, element);
  });
}

/********************************************************
* DELETE QUERIES
********************************************************/

/**
 * The query deletes one element, the first one matching the search term provided.
 * The callback from the query returns the deleted element.
 * This query deletes the whole element, not part of it.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json} searchTerm JSON containing the terms used for the database search.
 * @callback callback callback to manage the response from the server.
 * @param {?string} callback.e an error message, null if there is no error.
 * @param {json} callback.element the deleted database element.
 */
function deleteOneElement(database, searchTerm, callback){
  var e = null;
  database.findOneAndDelete(searchTerm, function(err, element){
    if (err) e = 'unable to complete request';
    else callback(e, element);
  });
}

/**
 * The query deletes the requested fields, or sub-documents, in a document.
 * The field is a list of values: it is possible to remove multiple fields in one call.
 * However, it is not possible to remove all the occurences of field from different documents in the collection.
 * For that, see deleteFieldFromAll.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json} searchTerm JSON containing the terms used for the database search.
 * @param {json} field A JSON containing the field(s) to remove.
 * @callback callback callback to manage the response from the server.
 * @param {?string} callback.e an error message, null if there is no error.
 * @see deleteFieldFromAll
 */
function deleteField(database, searchTerm, field, callback){
  var e = null;
  database.updateOne(searchTerm, { $pullAll: field}, {runValidators: true}, function (err, element){
    if (err) e = 'Could not delete the requested field(s) or sub-document(s)';
    else callback(e);
  });
}

/**
 * Similar to deleteField, but applies the changes to all documents in the
 * database.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json} field A JSON containing the field(s) to remove.
 * @callback callback callback to manage the response from the server.
 * @param {?string} callback.e an error message, null if there is no error.
 * @see deleteField
 */
function deleteFieldFromAll(database, field, callback){
  var e = null;
  database.updateMany({}, { $pullAll: field}, {runValidators: true}, function (err, element){
    if (err) e = 'Could not delete the requested field(s) or sub-document(s)';
    else callback(e);
  });
}

/**
 * The query is shorthand for deleting all elements in the database.
 * No search term has to be passed, as it defaults to any element (the empty set '{}').
 * The callback from the query returns, in this case, the whole collection.
 * At the end of this call, the collection is effectively wiped out, so be careful in calling it.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @callback callback callback to manage the response from the server.
 * @param {?string} callback.e an error message, null if there is no error.
 * @param {json} callback.elements the deleted collection of elements.
 */
function deleteAllElements(database, callback){
  var e = null;
  database.deleteMany({}, function(err, elements){
    if (err) e = 'unable to complete request.';
    else callback(e, elements);
  });
}

module.exports = {
  // POST QUERIES
  postOneElement: postOneElement,
  postManyElements: postManyElements,
    
  // GET QUERIES
  getOneElement: getOneElement,
  getAllElements: getAllElements,

  // PUT QUERIES
  updateOneElement: updateOneElement,

  //DELETE QUERIES
  deleteOneElement: deleteOneElement,
  deleteField: deleteField,
  deleteFieldFromAll: deleteFieldFromAll,
  deleteAllElements: deleteAllElements
};
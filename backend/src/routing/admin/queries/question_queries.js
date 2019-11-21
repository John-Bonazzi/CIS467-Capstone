const error_handler = require('../../../error_handling/Error');

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
    if (err) e = true;
    callback(e);
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

function deleteOneElement(database, searchTerm, res){
  database.findOneAndDelete(searchTerm, function(err, element){
    if (err) res.status(500).send('unable to complete request');
    else {
      try {
        console.log('element id: %s deleted successfully', element.tag);
        res.json('Element successfully deleted');
      } catch (err){
        error_handler.itemNotFound(searchTerm.tag);
        res.status(400).send('The requested item does not exist in the database.');
      }
    }
  });
}

function deleteAllElements(database, res){
  database.deleteMany({}, function(err, element){
    if (err) res.status(500).send('unable to complete request.');
    else {
      console.log('all elements deleted');
      res.json('Elements successfully deleted');
    }
  });
}

module.exports = {
  // POST QUERIES
  postOneElement: postOneElement,
    
  // GET QUERIES
  getOneElement: getOneElement,
  getAllElements: getAllElements,

  // PUT QUERIES
  updateOneElement: updateOneElement,

  //DELETE QUERIES
  deleteOneElement: deleteOneElement,
  deleteAllElements: deleteAllElements
};
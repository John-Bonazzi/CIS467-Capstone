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

function getOneElement(database, searchTerm, selectTerm, callback){
  var e = false;
  database.findOne(searchTerm, selectTerm, function(err, element){
    if (err) e = 'Unable to find element';
    callback(e, element);
  });
}

function getAllElements(database, callback){
  var e = false;
  database.find({}, function(err, element){
      if (err) e = 'Unable to complete request';
      callback(e, element);
  });
}

/********************************************************
* PUT QUERIES
********************************************************/

function updateOneElement(database, searchTerm, update, res){
  database.findOneAndUpdate(searchTerm, update, {new: true, runValidators: true}, function(err, element) {
    if (err) res.status(500).send('Unable to update element');
    else {
      try {
        console.log('id: %s\nquestion: %s', element.tag, element.question);
      } catch (err){
        error_handler.itemNotFound(id);
      } finally {
        res.json(element);
      }
    }
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
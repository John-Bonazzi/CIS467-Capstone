const error_handler = require('../../../Error_handling/Error');

/********************************************************
* POST QUERIES
********************************************************/

function postOneElement(newElement, res){
  newElement.save()
    .then(newElement => {
      res.json('Entry added successfully.');
    })
    .catch(err => {
      res.status(500).send('unable to save to database.');
    });
}

/********************************************************
* GET QUERIES
********************************************************/

function getOneElement(database, searchTerm, selectTerm, res){
  var element_copy;
  database.findOne(searchTerm, selectTerm, function(err, element){
    if (err) res.status(500).send('Unable to complete request.');
    else {
      try {
        console.log(element);
        res.json(element);
      } catch (err){
        res.status(400).send('Element not found.');
        error_handler.itemNotFound(searchTerm.tag);
      }
      finally{
        element_copy = element;
      }
    }
  });
  return element_copy;
}

function getAllElements(database, res){
  database.find({}, function(err, element){
      if (err) res.status(500).send('Unable to complete request');
      else{
        console.log("Requested all elements.");
        res.json(element);
      }
  });
}

/********************************************************
* DELETE QUERIES
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
const error_handler = require('../../../Error_handling/Error');

/********************************************************
* GET QUERIES
********************************************************/

function getOneElement(database, searchTerm, res){
    database.findOne(searchTerm, function(err, element){
      if (err) res.status(500).send('Unable to complete request.');
      else {
        try {
          console.log('id: %s\nquestion: %s.', element.tag, element.question);
          res.json(element);
        } catch (err){
          res.status(400).send('Element not found.');
          error_handler.itemNotFound(searchTerm.tag);
        } 
      }
    });
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
    // GET QUERIES
    getOneElement: getOneElement,
    getAllElements: getAllElements,

    //DELETE QUERIES
    deleteOneElement: deleteOneElement,
    deleteAllElements: deleteAllElements
};
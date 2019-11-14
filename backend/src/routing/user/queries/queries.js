const error_handler = require('../../../Error_handling/Error');
const {getOneElement} = require('../../admin/queries/question_queries');

/********************************************************
* GET QUERIES
********************************************************/

function getNextElement(database, id, res){
    database.findById(id, function(err, element){
        if (err) res.status(400).send('Unable to find second element');
        else {
            res.json(element);
            return element;
        }
    });
}

module.exports = {
    getNextElement: getNextElement
}
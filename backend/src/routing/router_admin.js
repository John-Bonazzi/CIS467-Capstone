const error_handler = require('../Error_handling/Error');
const express = require('express');
const router = express.Router();

const db_admin_entry = require('../schemas/admin_schema');

/*
 * The POST request creates an entry in the database.
 * Notice that the POST will create, not update, an
 * entry in the database.
 * PUT should be used to update a database entry.
 */
router.route('/admin').post(function (req, res) {
    const entry = new db_admin_entry(req.body);
    entry.save()
    .then(entry => {
        res.json('Entry added successfully.');
    })
    .catch(err => {
        res.status(400).send('unable to save to database.');
    });
});

/*
 * The GET request asks the database for the entry with
 * matching tag.
 * 
 * TODO: expand the get with 3 separate functions:
 * 0: get all the database
 * 1: get the matching tag
 * 2: get all the elements with an answer equal to given _id
 * the function will be part of the request body, as a number.
 * function 2 returns all elements that are connected to the given
 * element, searched by _id, as that is what is saved in the answers.
 */
router.route('/admin').get(function (req, res) {
    var id = req.body.name;
    db_admin_entry.findOne({'tag' : id}, 'tag question', function (err, element){
        if (err) res.status(400).send('Unable to find element');
        else { 
            try{
                console.log('id: %s\nquestion: %s.', element.tag, element.question);
            }
            catch(err){
                error_handler.itemNotFound(id);
            }
            finally{
                res.json(element);
            }
        }
    });
});

/*
 * The PUT request is used to modify one entry in the database.
 * The entry has to exist in the database, it does not create one.
 * The validators in the schema will be checked on update: for example,
 * an element's tag cannot be updated if the new tag is already existing in the
 * database.
 */
router.route('/admin').put(function (req, res) {
    var id = req.body.name;
    var update_param = {};
    update_param[req.body.element] = req.body.update;
    db_admin_entry.findOneAndUpdate({tag : id}, update_param, {new: true, runValidators: true,}, function (err, element) {
        if (err) res.status(400).send('Unable to update element');
        else {
            try{
                console.log('id: %s\nquestion: %s.', element.tag, element.question);
            }
            catch(err){
                error_handler.itemNotFound(id);
            }
            finally{
                res.json(element);
            }
        }
    });
});

/*
 * The DELETE request is used to remove an entry from the database.
 * 
 * TODO: after an element has been deleted, a search should be made,
 * and all references to the now erased _id should be replaced by a
 * "null" value.
 * Expand it with 3 functions:
 * 0: delete an element
 * 1: delete part of an element
 * 2: delete part of an element in bulk on multiple elements
 */
router.route('/admin').delete(function (req, res) {
    var id = req.body.name;
    db_admin_entry.findOneAndDelete({'tag' : id}, function(err, element){
        if (err) res.status(400).send('unable to delete element');
        else{
            try{
                console.log('element id: %s deleted successfully', element.tag);
                res.json('Element successfully deleted');
            }
            catch(err){
                error_handler.itemNotFound(id);
                res.json('The requested item does not exist on the database.');
            }
        }
    })
})

module.exports = router;
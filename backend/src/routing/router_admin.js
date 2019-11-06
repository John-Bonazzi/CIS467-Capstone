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
 */
router.route('/admin').get(function (req, res) {
    var id = req.body.name;
    db_admin_entry.findOne({'tag':id}, 'question', function (err, element){
        if (err) res.status(400).send('Unable to find element');
        else { 
            console.log('id: %s\nquestion: %s.', element.tag, element.question);
            res.json(element);
        }
    });
});

/*
 * The PUT request is used to modify one entry in the database.
 * The entry has to exist in the database, it does not create one.
 */
router.route('/admin').put(function (req, res) {
    
});

/*
 * The DELETE request is used to remove an entry from the database.
 */
router.route('/admin').delete(function (req, res) {
    
})

module.exports = router;
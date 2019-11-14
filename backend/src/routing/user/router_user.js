const error_handler = require('../../Error_handling/Error');
const express = require('express');
const router = express.Router();

const db_user_query = require('../../schemas/admin_schema');
const db_user_entry = require('../../schemas/user_schema');

router.route('/user').get(function(req, res) {
  var id = req.body.id;
  var answer = req.body.ans;
  db_user_query.findOne({tag: id}, 
    { 'answers': {
        $elemMatch: {
          'body': answer,}}}, function(err, element){
    if (err) res.status(500).send('Unable to complete the request.');
    else {
      try {
        console.log('id: %s\n', id);
        var new_id = element.answers[0].link;
          console.log(new_id);
          db_user_query.findById(new_id, function(err, element){
            if (err) res.status(400).send('Unable to find second element');
            else res.json(element);
          });
          } catch (err){
          error_handler.itemNotFound(id);
      } 
      }
    });
});

module.exports = router;

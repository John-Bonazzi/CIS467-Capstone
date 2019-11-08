const express = require('express');
const router = express.Router();

const db_user_query = require('../schemas/admin_schema');
const db_user_entry = require('../schemas/user_schema');

router.route('/user').get(function(req, res) {
  var id = req.body.name;
  db_user_query.findOne({tag: id}, 'tag question', function(err, element){
    if (err) res.status(400).send('Unable to find element');
    else {
      console.log('id: %s\nquestion: %s.', element.tag, element.question);
      res.json(element);
    }
  });
});

module.exports = router;

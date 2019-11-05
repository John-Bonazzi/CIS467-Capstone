const express = require('express');
const router = express.Router();

// query Model
const query = require('../../models/schema');

// @route GET api/query
// @desc Get all query
// @access Public
router.get('/', (req, res) => {
  query.find()
    .sort({date: -1})
    .then(querys => res.json(querys));
});

// @route POST api/querys
// @desc Create a post
// @access Public
router.post('/', (req, res) => {
  const newquery = new query({
    name: req.body.name,
  });

  newquery.save()
    .then(query => res.json(query));
});

// @route Delete api/querys/:_id
// @desc Delete a query
// @access Public
router.delete('/:id', (req, res) => {
  query.findById(req.params._id)
    .then(query => query.remove().then(() => res.json({success: true})))
    .catch(err => {
      res.status(404).json({success: false});
      console.log(err.stack);
    });
});

/**
 * Function to find elements by using the tag value.
 * WIP - there are a few things that need fixing
*/
function findByTag(tagValue){
  query.findOne({tag: tagValue}, callback);
}

function callback(err, obj){
}

module.exports = router;

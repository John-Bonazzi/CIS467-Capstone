const express = require('express');
const router = express.Router();

// Question Model
const Question = require('../../models/schema');

// @route GET api/questions
// @desc Get all questions
// @access Public
router.get('/', (req, res) => {
  Question.find()
    .sort({date: -1})
    .then(questions => res.json(questions));
});

// @route POST api/questions
// @desc Create a post
// @access Public
router.post('/', (req, res) => {
  const newQuestion = new Question({
    name: req.body.name,
  });

  newQuestion.save()
    .then(question => res.json(question));
});

// @route Delete api/questions/:id
// @desc Delete a question
// @access Public
router.delete('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({success: true})))
    .catch(err => {
      res.status(404).json({success: false});
      console.log(err.stack);
    });
});


module.exports = router;

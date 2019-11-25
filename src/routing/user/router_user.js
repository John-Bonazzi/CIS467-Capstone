const error_handler = require('../../error_handling/Error');
const express = require('express');
const router = express.Router();

const db_user_question = require('../../schemas/admin/question_schema');
const db_user_course = require('../../schemas/admin/course_schema');
const db_user_entry = require('../../schemas/user_schema');
const queries = require('./queries/queries');
const routines = require('../../routines/http_routines');


/**
 * Callback function used by express.Router.route.get function.
 * the get function is used to request a database entry from an
 * ObjectId contained in the req.body part of the request.
 * @param {Object} req the http request
 * @param {Object} res the http response
 */
function cb(req, res){
  var returningUser = req.session.returning;
  if (returningUser) {
    var close = false;
    var run = true;
    var link = req.query.newlink;
    //this supports for the user to start where they left, if they disconnect.
    if (link == null) link = req.session.lastLink;
    else req.session.lastLink = link;
    var type = req.query.type;
    var database = db_user_question;
    switch (type) {
      case 'Question':
        database = db_user_question;
        break;
      
      case 'Course':
        database = db_user_course;
        close = true;
        break;

      default:
        error_handler.badClientRequest(`Type ${type} does not exist.`);
        run = false;
        break;
    }
    if(run){
      routines.get_one_check_closure(req, res, queries, database, link, '', close);
    }
  }
  else {
    routines.get_init(req, res, queries, db_user_question, {tag: 'Initial'}, '');
    req.session.returning = true;
    req.session.history = [];
  }
}

router.route('/user').get(cb);

module.exports = router;
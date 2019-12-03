/**
 * The module contains a set of provided short hand mongoose query calls.
 * The queries provided should be used by the user side of the front-end.
 * @module routing/user/router_user
 * @requires error_handling/Error
 * @requires express
 * @requires schemas/admin/question_schema
 * @requires schemas/admin/course_schema
 * @requires config/routes
 * @requires routing/user/queries/queries
 * @requires routines/http_routines
 */

const error_handler = require('../../error_handling/Error');
const express = require('express');
const router = express.Router();

const db_user_question = require('../../schemas/admin/question_schema');
const db_user_course = require('../../schemas/admin/course_schema');
const {userRoute} = require('../../config/routes');
const queries = require('./queries/queries');
const routines = require('../../routines/http_routines');


/**
 * Callback function used by express.Router.route.get function.
 * the get function is used to request a database entry from an
 * ObjectId contained in the req.body part of the request.
 * @param {Object} req the http request
 * @param {Object} res the http response
 */
function cb_get(req, res){
  var returningUser = req.session.returning;
  var cookies = req.query.cookies;
  if(cookies == null) cookies = false;
  if (returningUser || !cookies) {
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
        error_handler.badClientRequest(res, `Type ${type} does not exist.`);
        run = false;
        break;
    }
    if(run){
      routines.get_one_check_closure(req, res, queries, database, {tag: link}, '', close);
    }
  }
  else {
    routines.get_init(req, res, queries, db_user_question, {tag: 'Initial'}, '');
    //Setting up session storage.
    req.session.returning = true;
    req.session.history = [];
  }
}

/**
 * Callback function to store the selected answers with the rest of the history.
 * At the end, it sends back a response with the full history array.
 * @param {Object} req the http request
 * @param {Object} res the http response
 */
function cb_post(req, res){
  var data = req.body;
  routines.log_data(req.session.history, data, result =>{
    req.session.history = result;
    res.status(201).json(req.session.history);
  });
}

router.route(userRoute).get(cb_get);

router.route(userRoute).post(cb_post);

module.exports = router;
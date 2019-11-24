const error_handler = require('../../error_handling/Error');
const express = require('express');
const router = express.Router();

const db_user_query = require('../../schemas/admin/question_schema');
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
    var link = req.body.link;

    //this supports for the user to start where they left, if they disconnect.
    if (link == null) link = req.session.lastLink;
    else req.session.lastLink = link;
    routines.get_one(res, queries, db_user_query, link, '');
  }
  else {
    routines.get_init(req, res, queries, db_user_query, {tag: 'Initial'}, '');
    req.session.returning = true;
  }
}

router.route('/user').get(cb);

module.exports = router;
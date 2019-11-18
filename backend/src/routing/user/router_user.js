const error_handler = require('../../error_handling/Error');
const express = require('express');
const router = express.Router();

const db_user_query = require('../../schemas/admin_schema');
const db_user_entry = require('../../schemas/user_schema');
const queries = require('./queries/queries');
const routines = require('../../routines/http_routines');

// If the server causes problems with multiple users connected, this is probably the cause (check cb as well)
var firstRequest = true;

/**
 * Callback function used by express.Router.route.get function.
 * the get function is used to request a database entry from an
 * ObjectId contained in the req.body part of the request.
 * @param {Object} req the http request
 * @param {Object} res the http response
 */
function cb(req, res){
  if (firstRequest) {
    routines.get_init(res, queries, db_user_query, {tag: 'Initial'}, '');
    firstRequest = false;
  }
  else routines.get_one(res, queries, db_user_query, req.body.link, '');
}

router.route('/user').get(cb);

module.exports = router;
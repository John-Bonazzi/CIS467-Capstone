/**
 * The module provides definitions for all REST requests and routes that handle the admin side of the server.
 * The routes contained in the module connect to a specific collection of the database that stores 'courses'.
 * @module routing/admin/course_admin
 * @requires error_handling/Error
 * @requires express
 * @requires schemas/admin/course_schema
 * @requires config/routes
 * @requires routing/admin/queries/question_queries
 * @requires routines/http_routines
 */

const error_handler = require('../../error_handling/Error');
const express = require('express');
const router = express.Router();

const db_admin = require('../../schemas/admin/course_schema');
const {courseRoute} = require('../../config/routes');
const queries = require('./queries/admin_queries');
const routines = require('../../routines/http_routines');

/**
 * The POST request creates entries in the database, in the <code>Course</code>.
 * The POST will create, not update, an entry in the database.<br>
 * PUT should be used to update a database entry.
 * By default <code>option = '1'</code>.<br>
 * Available options:<ul>
 * <li><code>0</code>: post many elements as an array of JSON objects, each separated by a comma. <br>Example: <code>[{object 1}, {object 2}, ...].</code></li>
 * <li><code>1</code>: post a single element as a JSON object. <br>Example: <code>{object}</code></li>
 * </ul>
 * If the option passed does not match any of the provided options, a <code>400 Bad Request</code> is sent back as response.<br><br>
 * Example of a request to add a single element:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">option: '1'},</p>
 * body: {JSON object}<br>}</code><br><br>
 * Example of a request to add multiple elements:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">option: '0'},</p>
 * body: [{object 1}, {object 2}, ...]<br>}</code>
 * @callback postRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 * @see putRoute
 */
router.route(courseRoute).post(function(req, res) {
    var opt = req.query.option || '1';
    var docs = req.body;
    switch (opt){
      case '0':
        routines.post_many(res, queries, db_admin, docs);
        break;
      case '1':
        var db_entry = new db_admin(docs);
        routines.post_one(res, queries, db_entry);
        break;
      default:
          error_handler.badClientRequest(res, "Could not understand 'option' value");
          break;
    }
  });
  
/**
 * The GET request offers different options, passed in the request as an <code>option</code> field in the parameters. By default <code>option = '0'</code>.<br>
 * Available options:<ul>
 * <li><code>0</code>: get all the database. This does not require the <code>name</code> parameter in the request, although its presence does not cause an error.</li>
 * <li><code>1</code>: asks the database for the entry with matching tag. Only one entry is returned.<br> If the tag is empty or <code>null</code>, a null element is returned.</li></ul>
 * If the option passed does not match any of the provided options, a <code>400 Bad Request</code> is sent back as response.<br><br>
 * Example of a request to get an element with tag <code>CIS 467</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '1',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">name: 'CIS 467'}</p>
 * }</code><br><br>
 * Example of a request to get all the elements:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">option: '0'</p>
 * }</code><br><br>
 * @callback getRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route(courseRoute).get(function(req, res) {
  var id = req.query.name;
  var opt = req.query.option || '0';
  switch (opt) {
    case '0':
      routines.get_all(res, queries, db_admin);
      break;
      
    case '1':
      routines.get_one(res, queries, db_admin, {tag: id}, '');
      break;
  
    default:
      error_handler.badClientRequest(res, "Could not understand 'option' value");
      break;
    }
  });
  
/**
 * The PUT request is used to modify one entry in the database.
 * The entry has to exist in the database, it does not create one.<br>
 * The validators in the schema will be checked on update: for example, an element's tag cannot be updated if the new tag is already existing in the database.<br><br>
 * Example of a request to update the description to of <code>CIS 467</code> to <code>Example</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">name: 'CIS 467'},</p>
 * body: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">description: 'Example'}</p>
 * }</code><br><br>
 * 
 * @callback putRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route(courseRoute).put(function(req, res) {
  var id = req.query.name;
  var update_param = req.body;
  routines.update_one_doc(res, queries, db_admin, {tag: id}, update_param);
});
  
/**
 * The DELETE request is used to remove entries in the database.
 * Different delete functions are provided, and the option to choose it is passed in the <code>option</code> field in the parameters.<br>
 * By default <code>option = '1'</code>.<br>
 * The option is a string, and the supported options are the following:<ul>
 * <li><code>0</code>: delete all elements. Does not require a <code>name</code> field in the request.</li>
 * <li><code>1</code>: delete a single element.</li></ul>
 * If the option passed does not match any of the provided options, a <code>400 Bad Request</code> is sent back as response.<br><br>
 * Example of a request to delete the element with tag <code>CIS 467</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '1',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">name: 'CIS 467'}</p>
 * }</code><br><br>
 * Example of a request to delete all the elements:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '0'</p>
 * }</code><br><br>
 * 
 * @callback deleteRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route(courseRoute).delete(function(req, res) {
  var id = req.query.name;
  var opt = req.query.option;
  if (opt == null && id != null) opt = '1';
  switch (opt){
    case '0':
      routines.delete_all(res, queries, db_admin);
      break;
  
    case '1':
      routines.delete_one(res, queries, db_admin, {tag: id});
      break;
      
    default:
      error_handler.badClientRequest(res, "Could not understand 'option' value");
      break;
    }
  });
  
  module.exports = router;
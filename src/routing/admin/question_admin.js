/**
 * The module provides definitions for all REST requests and routes that handle the admin side of the server.
 * The routes contained in the module connect to a specific collection of the database that stores 'questions'.
 * @module routing/admin/question_admin
 * @requires error_handling/Error
 * @requires express
 * @requires schemas/admin/question_schema
 * @requires config/routes
 * @requires routing/admin/queries/question_queries
 * @requires routines/http_routines
 */

const error_handler = require('../../error_handling/Error');
const express = require('express');
const router = express.Router();

const db_admin = require('../../schemas/admin/question_schema');
const {questionRoute} = require('../../config/routes');
const queries = require('./queries/admin_queries');
const routines = require('../../routines/http_routines');

/**
 * The POST request creates entries in the database, in the <code>Question</code> collection.
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
router.route(questionRoute).post(function(req, res) {
  var opt = req.query.option;
  if (opt == null) opt = '1';
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
 * Example of a request to get an element with tag <code>Initial</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '1',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">name: 'Initial'}</p>
 * }</code><br><br>
 * Example of a request to get all the elements:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">option: '0'</p>
 * }</code><br><br>
 * @callback getRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route(questionRoute).get(function(req, res) {
  var name = req.query.name;
  var opt = req.query.option || '0';
  switch (opt) {
    case '0':
      routines.get_all(res, queries, db_admin);
      break;
    case '1':
      routines.get_one(res, queries, db_admin, {tag: name}, '');
      break;
    default:
      error_handler.badClientRequest(res, "Could not understand 'option' value");
      break;
  }
});

/**
 * The PUT request is used to modify one entry in the database.
 * The entry has to exist in the database, it does not create one.
 * <br>
 * The validators in the schema will be checked on update: for example,
 * an element's tag cannot be updated if the new tag is already existing in the
 * database.
 * <br>
 * Elements to pass in the request (<code>field (type): description</code>):
 * <ul>
 *  <li> name (<em>params</em>): the 'tag' value used to find the element in the database.</li>
 *  <li> option (<em>params</em>): the value that tells the server what routine to load. It defaults at '1'.</li>
 *  <li> index (<em>params</em>): used ONLY for updating a sub-document. It is the index of the element you want to update.<br>For example, the 'answers' field is an array that contain multiple elements, each one with a 'content' and 'link' field. <br>If you want to update the 'content' of the first element in 'answers', you must pass '0' as index value. <br>The value defaults at 0 (number). The value can be expressed either as a string, or a number.</li>
 *  <li> element (<em>params</em>): This is the _id of the object where the field is located. For example, if the field you want to change is "body", a part of "content", then the element will be the _id of that "content" entry.</li>
 *  <li> field (<em>params</em>): This is the name of the field that acts as object. For example, if you want to change the "body", then field has to be "content"; if you want to change the "dbref", then the field has to be "link".</li>
 * <li>req.body (<em>body</em>): A field:value pair, the field is the element you want to change, and the value is the new value. For example, if you want to change the "body" to "new answer!", then the body has to be: body: new answer!.</li></ul>
 * <br>
 * available options:
 * <ol>
 *  <li> update a top-level field, for example update 'question', but cannot update 'answers'.</li>
 *  <li> update a sub-document's field, like any field in 'answers'.</li></ol>
 * <br>
 * A few things to note here:
 * <ul>
 *  <li> Not all update operations are atomic. Specifically, option 2 is not atomic, so beware that an element could change after it has been pulled from the database, and before the update has been saved. </li>
 *  <li> I tested the request body by sending an x-www-form-urlencoded with Postman; I could NOT make the request work by sending a RAW JSON from the Postman body section of the request. I do not know if this will change how the frontend request has to be coded.</li>
 *  <li> It is possible to expand option 2 to modify all matching elements and not just one; however for that to work the query must be changed, as right now it calls a findOne() call. This might be useful if a course had been deleted and all dbrefs pointing to it have to be purged.</li></ul>
 * Example of a request to update the <code>question</code> in the <code>Initial</code> question to <code>Example</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '1',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">name: 'Initial'},</p>
 * body: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">question: 'Example'}</p>
 * }</code><br><br>
 * 
 * Example of a request to update the <code>body</code> of the first answer in the <code>Initial</code> question to <code>Example</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '2',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">name: 'Initial',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">element: '5deeba1d7dae0a0004109d0b',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">index: '0',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">field: 'content'},</p>
 * body: {
 * <p style="LINE-HEIGHT:0px; margin-left: 40px">body: 'Example'}</p>
 * }</code><br><br>
 * 
 * @callback putRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route(questionRoute).put(function(req, res) {
  var id = req.query.name;
  var opt = req.query.option || '1';
  var index = req.query.index || 0;
  var fieldID = req.query.element;
  var field = req.query.field;
  var update = req.body;
  switch(opt){
    case '1': 
      routines.update_one_doc(res, queries, db_admin, {tag: id}, update);
      break;

    case '2':
      routines.update_one_answer(res, queries, db_admin, {tag: id}, field, fieldID, index, update);
      break;

    default:
      error_handler.badClientRequest(res, "Could not understand 'option' value");
      break;
  }
});

/**
 * The DELETE request is used to remove entries in the database.
 * Different delete functions are provided, and the option to choose it is passed in the <code>option</code> field in the parameters.<br>
 * By default <code>option = '1'</code>.<br>
 * The option is a string, and the supported options are the following:<ul>
 * <li><code>0</code>: delete all elements. Does not require a <code>name</code> field in the request.</li>
 * <li><code>1</code>: delete a single element.</li></ul>
 * If the option passed does not match any of the provided options, a <code>400 Bad Request</code> is sent back as response.<br><br>
 * Example of a request to delete the element with tag <code>Initial</code>:<br>
 * <code>{<br>params: {
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">option: '1',</p>
 * <p style="LINE-HEIGHT:5px; margin-left: 40px">name: 'Initial'}</p>
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
router.route(questionRoute).delete(function(req, res) {
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

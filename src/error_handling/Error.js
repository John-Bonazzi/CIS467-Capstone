/**
 * The module contains defines a variety of errors that could be encountered by the server.
 * It also offers proper error status code report.
 * @module error_handling/Error
 */

/**
 * An error used when there is a problem in the console output when testing.
 * For example, if an element is not present in a JSON file, this error would help identify the missing value.<br>
 * This is an error that should be used for testing purposes, when you have access to a console. No response is being sent.
 * @param {*} id the value that threw the error. 
 */
function itemNotFound(id) {
  console.log('The requested element with id: %s does not exist.', id);
}

/**
 * Generic error handling that logs a message to the console.<br>
 * This is an error that should be used for testing purposes, when you have access to a console. No response is being sent.
 * @param {*} message anything to be printend by the console.
 */
function logError(message){
  console.log(message);
}

/**
 * An error used when the syntax in the client's request cannot be understood by the server.<br>
 * It is assumed that the server was able to complete the request, but that the request was wrong to begin with (like a query for a non-existent database element), so the status code returned is <code>400 Bad Request</code>.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {string} message a message to send back with the status code.
 */
function badClientRequest(res, message) {
  res.status(400).send(message);
}

/**
 * An error used when something goes wrong in the server. 
 * This is an error that means the request could not be completed because of an error present in the server, so the status code returned is <code>500 Internal Server Error</code>.<br>
 * For example, the server-database connection is interrupted, or any other generic crash in the server.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {string} message a message to send back with the status code.
 */
function badServerHandler(res, message){
  res.status(500).send(message);
}

/**
 * An error used when the server tries to invoke a non-existent function.
 * This error could mean that a module passed as a parameter does not have the requested function in it.<br>
 * The status is set to <code>501 Not Implemented</code>.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {string} message a message to send back with the status code.
 */
function functionDoesNotExist(res, message){
  res.status(501).send(message);
}

/**
 * An error used when a document, or more, do not pass the mongoose schema validators.
 * This sends back a <code>200 OK</code> status, meaning the request has been completed.<br>
 * However, that means the request has been partially completed, and returns a list of errors for the parts of the request that failed.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {json} document a list of all the failed parts of the request.
 */
function validationError(res, document){
  res.status(200).json(document);
}


module.exports = {
  itemNotFound: itemNotFound,
  logError: logError,
  badClientRequest: badClientRequest,
  badServerHandler: badServerHandler,
  functionDoesNotExist: functionDoesNotExist,
  validationError: validationError
}

function itemNotFound(id) {
  console.log('The requested element with id: %s does not exist.', id);
}

/**
 * an error used when the syntax in the client's request cannot be understood by the server. 
 * It is assumed that the server was able to complete the request, but that the request was wrong to begin with (like a query for a non-existent database element), so the status code returned is 400.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {string} message a message to send back with the status code.
 */
function badClientRequest(res, message) {
  res.status(400).send(message);
}

/**
 * an error used when something goes wrong in the server. 
 * This is an error that means the request could not be completed because of an error present in the server, so the status code returned is 500.
 * For example, the server-database connection is interrupted, or any other generic crash in the server.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {string} message a message to send back with the status code.
 */
function badServerHandler(res, message){
  res.status(500).send(message);
}


module.exports = {
  itemNotFound: itemNotFound,
  badClientRequest: badClientRequest,
  badServerHandler: badServerHandler
}

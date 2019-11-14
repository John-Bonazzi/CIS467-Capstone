function itemNotFound(id) {
  console.log('The requested element with id: %s does not exist.', id);
}

function badClientRequest(res) {
  res.status(400).send("Could not understand request");
}

module.exports = {
  itemNotFound: itemNotFound,
  badClientRequest: badClientRequest
}

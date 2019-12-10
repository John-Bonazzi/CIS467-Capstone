/**
 * The module contains the root route for the server.
 * The route is used to display a web page with server documentation.
 * @module routing/root_route
 * @requires express
 */

const express = require('express');
const router = express.Router();

/**
 * Display documentation about the server.
 * @callback rootRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route('/').get((req, res) =>{
    var address = 'https://capstonedocumentation.s3.us-east-2.amazonaws.com/documentation/index.html'
    res.redirect(address);
});

module.exports = router;

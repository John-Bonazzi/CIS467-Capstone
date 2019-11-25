const express = require('express');
const router = express.Router();

var message = "Server supporting GVSU CIS Project Capstone, CIS 467.\nAuthor: John Bonazzi.\nVersion: 0.9\n GitHub: https://github.com/GionataB/CIS467-Capstone"

/**
 * Display info about the server.
 * @name rootRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route('/').get((req, res) =>{
    res.json(message);
});
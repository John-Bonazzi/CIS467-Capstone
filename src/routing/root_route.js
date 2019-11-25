const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const request = require('request');
aws.config.region = 'us-east-2';

const S3_BUCKET = process.env.S3_BUCKET;

var message = {
    about: "Server supporting GVSU CIS Project Capstone, CIS 467.",
    Author: "John Bonazzi",
    Version: 0.9,
    GitHub: "https://github.com/GionataB/CIS467-Capstone"
};

/**
 * Display info about the server.
 * @name rootRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route('/').get((req, res) =>{
    /*var s3 = new aws.S3();
    var params = {Bucket: S3_BUCKET, key: 'welcome.html'};*/
    var address = `http://s3.amazonaws.com/${S3_BUCKET}/welcome.html`
    request(address).pipe(res);
    //s3.getObject()
});

module.exports = router;

/**
 * The module contains the root route for the server.
 * The route is used to display a web page with server documentation.
 * @module routing/root_route
 * @requires express
 * @requires request
 * @requires aws-sdk
 */

const express = require('express');
const router = express.Router();
const request = require('request');
const aws = require('aws-sdk');
const path = require('path');

aws.config.region = 'us-east-2';

/**
 * Display documentation about the server.
 * @name rootRoute
 * @param {Object} req the request received from a client
 * @param {Object} res the response from the server
 */
router.route('/*').get((req, res) =>{
    var url = req.originalUrl;
    if(url === '/') url = "index.html";
    res.sendFile(url, {
        root: path.join(__dirname, '../../out'),
    });
    /*const s3 = new aws.S3();
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: "index.html",
    };
    s3.getSignedUrl('getObject', s3Params, (err, data) =>{
        if(err){
            console.log(err);
            res.status(400).end(); 
        }
        else{
            res.writeHead
        }
    });*/
    /*var url = req.originalUrl;
    if(url === '/') url = "index.html";
    var address = `https://capstonedocumentation.s3.us-east-2.amazonaws.com/out/${url}`
    request(address).pipe(res);*/
});

module.exports = router;

const express = require('express');
const router = express.Router();

const database_entry = require('../../models/schema');

router.route('/create').post(function (req, res) {
    const entry = new database_entry(req.body);
    entry.save()
    .then(entry => {
        res.json('Entry added successfully');
    })
    .catch(err => {
        res.status(400).send('unable to save to database');
    });
});

module.exports = database_entry;
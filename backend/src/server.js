const express = require('express');
const mongoose = require('mongoose');

const questions = require('./routes/api/questions');

const app = express();
const router_agent = require('./routes/api/router_agent');

const PORT = process.env.PORT || 5000;

/*
 * The body parser module is a middleware piece of software
 * that extracts the body portion of the request stream,
 * and can be accessed on req.body.
 * In short, it takes the body of a HTTP request
 * and make it readable.
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extendend: true }));

app.use('/routes/api/router_agent', database_entry);

// Connection string for the database connection.
const database_agent = require('./config/keys');

/*
 * Connect the server to the database to provide the service.
 */
mongoose.connect(database_agent.mongoURI, {useNewUrlParser: true})
  .then(()  => console.log('Connection to the database established'), 
  err => console.log(`Could not connect to the database.\nError code: ${err}`));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)}
  );


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const router_admin = require('./routing/router_admin');
const router_user  = require('./routing/router_user');

const PORT = process.env.PORT || 5000;

/*
 * The body parser module is a middleware piece of software
 * that extracts the body portion of the request stream,
 * and can be accessed on req.body.
 * In short, it takes the body of a HTTP request
 * and make it readable.
 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use('', router_admin );
app.use('', router_user);

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


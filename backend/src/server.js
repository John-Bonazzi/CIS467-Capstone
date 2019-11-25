const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const router_admin = require('./routing/admin/question_admin');
const router_user = require('./routing/user/router_user');

const app = express();

const PORT = process.env.PORT;
if(PORT == null || PORT == ""){
  PORT = 5000;
}

/**
 * The body parser module is a middleware piece of software
 * that extracts the body portion of the request stream,
 * and can be accessed on req.body.
 * In short, it takes the body of a HTTP request
 * and make it readable.
 * @const {Object}
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Allows for storing session-related values.
 * expires: false means that the session remains active as long as the user-agent is active, or the session is manually destroyed.
 * That means in the case the user closes the browser web, the session is destroyed.
 * maxAge, in msec, is the time between requests that has to pass before the session can be considered expired.
 * Unfortunately, most browser-webs ingore expires if there is a maxAge.
 * There is a choice to make: reset the session upon disconnection, or reset it upon inactivity.
 * Note that maxAge is highly recommended in most cases, while expire is an old standard.
 * @name app_session
 */
app.use(session({
  secret: 'capstone',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: false,
    maxAge: 5 * 60 * 1000, //convert 1 sec (1000 msec) to 5 mins. 5 + 1 min in 60 sec, 60 * 1 sec in 1000 msec.
  }
}));

app.use('', router_admin);
app.use('', router_user);

// Connection string for the database connection.
const database_agent = require('./config/keys');

/**
 * Connect the server to the database to provide the service.
 * @name mongoConnection
 * @type {Function}
 */
mongoose.connect(database_agent.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connection to the database established'),
    err => console.log(`Could not connect to the database.\nError code: ${err}`));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');

const questions = require('./routes/api/questions');

const app = express();

const port = process.env.PORT || 5000;

/*
// Bodyparser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
*/

// Mongo URI or local mongo DB
const database_agent = require('./config/keys').mongoURI;

// connect to Mongo
mongoose.connect(database_agent, {useNewUrlParser: true})
  .then(()  => console.log('Connection to the database established'), 
        err => console.log(err));


// Use Routes
app.use('/api/questions', questions);



app.listen(port, () => console.log(`Server started on port ${port}`));


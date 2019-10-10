const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const questions = require('./routes/api/questions');

const app = express();

//Bodyparser middlewear

app.use(bodyParser.json());


//Mongo URI or local mongo DB
const db = require('./config/keys').mongoURI;

//connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


//Use Routes
app.use('/api/questions', questions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


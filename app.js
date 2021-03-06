const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var fs=require('fs');


// Connect To Database (OLD CODE)
mongoose.connect(config.database, { useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
  var msg='Connected to Database '+config.database;
  fs.appendFileSync('./routes/erroLog.txt',msg);
});
// On Error
mongoose.connection.on('error', (err) => {
  var msg='Database error '+err;
  fs.appendFileSync('./routes/erroLog.txt',msg);
});

const app = express();

const users = require('./routes/users');

const quizdata = require('./routes/quizQuestions');

app.use('/quizdata',quizdata);

// Port Number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  var msg='Server started on port '+port;
  fs.appendFileSync('./routes/erroLog.txt',msg);
});




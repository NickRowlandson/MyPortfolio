/*
Project Name: Assignment 2 (Personal Portfolio)
By: Nick Rowlandson
Student ID: 200167125

*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');

// Route Alias
var users = require('./routes/users');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//DB Setup
var DB = require('./config/db.js');
mongoose.connect(DB.url);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Failed..');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//Setup routes
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
 });
 
app.all('/', function(req, res) {
  res.json('Default response. Things seem to be working.');
});

app.userRoutes = require('./routes/users.js')(app);

//++++++++++++     Routes        ++++++++++++++++++

// POST method route
app.post('/contact', function (req, res) {
  var contactFormData = req.body.contactData;
  
  //Do nodemailer stuff here...
  
  res.send('POST request to the homepage');
});
//++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(8080);
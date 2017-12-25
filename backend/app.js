var express = require('express');
var app   = express();
var mongoose= require('mongoose');
var passport= require('passport');
var flash   = require('connect-flash');

var morgan    = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var session   = require('express-session');

var configDB = require('./src/Config/database.js');

//configuration ===================================
mongoose.connect(configDB.url)
  .then(()=>console.log('connection suuccesful'))
  .catch((err) => console.log(err)); // connect to our database

require('./src/config/passport.js')(passport); //pass passport for configuration


//set up our express application
app.use(morgan('dev')); //log every request to the console 
app.use(cookieParser()); //read cookies (needed for auth)

//get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //set up ejs for templating

//require for passport
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true })); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash message stored in session

//routes ===============================================
require('./src/Routes/UserRoute.js')(app, passport); //load our routes and pass in our app and fully configurated passport

app.listen(3000, function (){
  console.log('Authentication demo already listen on port 3000!');
});
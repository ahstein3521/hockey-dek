const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser')

const path = require('path');
require("dotenv").config();

const models = require('./models/index');
const Routes = require('./api/index');
const passportConfig = require('./services/auth');
const MONGO_URI = process.env.MONGO_URI


const MongoStore = require('connect-mongo')(session);
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, { useMongoClient: true });
mongoose.connection
    .once('openUri', () => console.log('Connected to MongoDB'))
    .on('error', error => console.log('Error connecting to MongoDB:', error));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));


if (process.env.NODE_ENV === 'dev') {
  const webpackMiddleware = require('../webpack.dev.middleware');

  app.use(webpackMiddleware);
} else {
  app.use('/', express.static(path.join(__dirname, '../dist')));
}


app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./api/auth'));
app.use('/player', require('./api/player'));
app.use('/team', require('./api/team'));
app.use('/season', require('./api/season'));
app.use('/game', require('./api/games'));
app.use('/waiver', require('./api/waiver'));
app.get("*", function(req,res){
	res.redirect("/");
})


module.exports = app;

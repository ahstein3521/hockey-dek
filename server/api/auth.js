const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Player = mongoose.model('player');
const Team = mongoose.model('team');


const checkAuthentication = (req, res, next) => {
  
  if(!req.user) {
    return next();
  }

  const auth = { 
    user: req.user, 
    loggedIn: true, 
    loading: false 
  };
  
  const populateTeams = {
    path: 'currentSeason',
    select:'-players -games -formerPlayers'
  };
  
  const playerFields = {
    firstName:1, 
    lastName:1, 
    email:1, 
    phone:1
  };

  Promise.all([
    Team.find({}).populate(populateTeams).exec(),
    Player.find({}).select(playerFields).exec()
  ])
  .then(([teams, players]) => 
    res.send({ teams, players, auth })
  )
  .catch(err => { throw err })
};

const logInUser = (req,res) => {
  req.logIn(req.user, err => {
    if(err) throw err;
    res.redirect('/')   
  })
}


const logOutUser = (req, res) =>{
  req.logout();
  res.status(200).send("User logged out");
}

const handleAuthFail = (req, res) => {
  const auth = {
    loggedIn: false,
    loading: false
  };

  return res.send({ auth });
}

Router.route("/google")
  .get(passport.authenticate('google',{scope:['profile','email']}));


Router.route("/google/callback")
  .get(passport.authenticate('google',{failureRedirect: '/'}), logInUser);

Router.route('/logout')
  .post(logOutUser);

Router.route('/authenticate')
  .post(checkAuthentication, handleAuthFail);

module.exports = Router;  
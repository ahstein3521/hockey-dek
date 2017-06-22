const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Player = mongoose.model('player');
const Team = mongoose.model('team');


const checkAuthentication = ( req, res ) => {
  
  if(!req.user) {
    return res.send({ auth: { loggedIn:false, loading: false } });
  }

  const auth = { user: req.user, loggedIn: true, loading: false };

  Promise.all([

      Team.find({})
        .populate({path:'currentSeason', select:'-games -players'})
        .exec(),
      
      Player.find({}, {firstName:1, lastName:1, email:1, phone:1}).exec()
    ])
    .then((data) => {
      const [teams, players] = data;
      res.send({ teams, players, auth });
    })
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


Router.route("/google")
  .get(passport.authenticate('google',{scope:['profile','email']}));


Router.route("/google/callback")
  .get(passport.authenticate('google',{failureRedirect: '/'}), logInUser);

Router.route('/logout')
  .post(logOutUser);

Router.route('/authenticate')
  .post(checkAuthentication);

module.exports = Router;  
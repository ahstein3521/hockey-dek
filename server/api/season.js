const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

const Season = mongoose.model('season');

const ObjectId = mongoose.Types.ObjectId;

const getCheckins = require('./aggregate/player-checkins'); 
  
Router.route('/show/:_id')
  .get((req,res) => {
   
    Season.findById(req.params._id)
      .populate({path:'players',select:'firstName lastName'})
      .populate({path:'team',select:'name'})
      .exec()
      .then(data => res.send(data));
  })  

Router.route('/check')
  .get((req,res) => {
   const { team1, team2 } = req.query;
 
   const seasons = [ team1, team2 ];
    

    getCheckins(seasons)
      .then(r => res.send(r))
      .catch(e => res.send(e))
  })  


// Router.route('/show/:team/:quarter/:year')
//   .get((req,res) => {
//     const {quarter, year, team} = req.params;
//     Season.find({quarter, year, team})
//       .populate('players', 'firstName lastName')
//       .populate('formerPlayers', 'firstName lastName')
//       .populate('team', 'name hockeyType')
//       .exec()
//       .then(data => res.send(data))
//   }) 



module.exports = Router;     
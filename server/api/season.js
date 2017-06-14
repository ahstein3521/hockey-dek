const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

const Season = mongoose.model('season');


  
Router.route('/show')
  .get((req,res) => {
   
    Season.find({})
      .populate({path:'players',select:'firstName lastName'})
      .populate({path:'team',select:'name'})
      .exec()
      .then(data => res.send(data));
  })  




Router.route('/show/:team/:quarter/:year')
  .get((req,res) => {
    const {quarter, year, team} = req.params;
    Season.find({quarter, year, team})
      .populate('players', 'firstName lastName')
      .populate('formerPlayers', 'firstName lastName')
      .populate('team', 'name hockeyType')
      .exec()
      .then(data => res.send(data))
  }) 



module.exports = Router;     
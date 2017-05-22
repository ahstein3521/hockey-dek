const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const Players = mongoose.model('player');
const _ = require("lodash");
const ObjectId = mongoose.Types.ObjectId;

const getRoster = require('./aggregations/roster');

const getSeasons = (teamId, sId) => (
  Season
    .find({team:teamId})
    .select("formatted year quarter")
    .exec()
    .then(seasons => {
      let list = [];
      let currentSeason;
      seasons.forEach(season => {
        if(season._id != sId) list.push(season);
        else currentSeason = season;
      })
      return Promise.resolve({list, currentSeason})
    })
)

Router.route('/search/:seasonId/:teamId')
  .get((req, res) => {
    const {seasonId, teamId} = req.params;
    const {name, hockeyType} = req.body;
    
    Promise.all([
      getRoster(seasonId),
      getSeasons(teamId, seasonId)
    ])
    .then(data => {      
      const [playerInfo, seasons] = data;
      
      res.send({ 
        team: playerInfo,
        seasons
      })
    });  
})
Router.route('/show')
  .get((req,res) => {
    Team.find({})
      .exec()
      .then(data => res.send(data))
})  

module.exports = Router;  
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Player = mongoose.model('player');
const Season = mongoose.model('season');
const Game = mongoose.model('game');
const _ = require('lodash');

let date = new Date('2017-3-3');

function splitPlayers(){
  return Player.find({}).exec()
    .then(players =>  {
      const p = _.shuffle(players);
      return _.chunk(p, 16);
    })
}

function getTeams(){
  return Team.find({}).exec()
    .then(teams => teams)
}


Router.route('/archive/:teamId')
  .get((req, res) => {
    const { teamId } = req.params;
    
    Team.findOne({_id: teamId})
      .exec()
      .then( team => {
        const { players, } = team;
        const newSeason = new Season({year, season, team, players})
        newSeason.save()
        res.send(team);
      })
      // .catch(error => res.send({error}))   
})

  
Router.route('/show')
  .get((req,res) => {
   
    Season.find({})
      .populate({path:'players',select:'firstName lastName'})
      .populate({path:'team',select:'name'})
      .exec()
      .then(data => res.send(data));
  })  




Router.route('/show/:team/:season/:year')
  .get((req,res) => {
    const {season, year, team} = req.params;
    Season.find({season, year, team})
      .populate('players', 'firstName lastName')
      .populate('team', 'name hockeyType')
      .exec()
      .then(data => res.send(data))
  }) 



module.exports = Router;      // Promise.all([
    //   // _.times(10, () => {
    //   //   date.setDate(date.getDate()+7);
    //   //   return Game.create({date})
    //   //})
    //   Game.find({}).exec(),
    //   Season.findOne({}).exec()
    // ])
    // .then((data) =>{
    //   const [games, season] = data;
    //   season.games = games;
    //   return season.save()
    // })
    // .then((data)=> res.send(data))
const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');

const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Players = mongoose.model('player');


const getRoster = require('./aggregate/roster');


Router.route('/search/:seasonId/:teamId')
  .get((req, res) => {
    const {seasonId, teamId} = req.params;
    
    Promise.all([
      getRoster(seasonId), 
      Season
        .find({team: teamId})
        .select('-games -players -oldGames')
        .sort({ year: -1, quarter: -1 })
        .exec()
    ])
    .then(data => {      
      const [playerInfo, seasons] = data;
         
      res.send({ 
        team: playerInfo,
        seasons
      })
    });  
})

Router.route('/delete/:teamId')
  .delete((req, res) => {

    const { teamId } = req.params;

    Team.findByIdAndRemove( teamId )
      .exec()
      .then(() => res.status(200).send(teamId +' was successfully removed'))
      .catch(error => { throw error})
  })

Router.route('/create')
  .post((req, res) => {
    const { season, team } = req.body;

    Season.create(season)
      .then( newSeason => {
        team.currentSeason = newSeason;     
        const newTeam = new Team(team)
    
        return newTeam.save();
      })
      .then(({currentSeason, _id}) => {
        team._id = _id;
        return Season.findByIdAndUpdate(currentSeason, {team: _id}).exec()
      })
      .then(() => res.send(team))
      .catch(err => { throw err})   
  })

Router.route('/update/basic-info/:teamId')
  .put((req, res) => {
    const { teamId } = req.params;
    const query = { team: teamId };
    const options = { multi: true, new: true, upsert: true }; 
    
    Team.findByIdAndUpdate(teamId, req.body)
      .exec()
      .then(() => {
        res.status(200).send('team updated')
      })
      .catch(err => { throw err })
  })


Router.route('/update/players/:seasonId')
  .put((req, res) => {
    const { seasonId } = req.params;
    
    Season.updateRoster(seasonId, req.body, getRoster)
      .then(team => res.send(team))
  })  

Router.route('/show')
  .get((req,res) => {
    Team.find({})
      .exec()
      .then(data => res.send(data))
})  

module.exports = Router;  
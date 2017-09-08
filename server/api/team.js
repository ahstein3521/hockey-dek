const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Players = mongoose.model('player');
const ObjectId = mongoose.Types.ObjectId;

const getRoster = require('./aggregate/roster');



// POST - create a new team
function createTeam(req, res) {
  const { season, team } = req.body;

  const newTeam = new Team(team);
  // pass a season object to the save method
  // the teamSchema has a pre-save hook that creates a brand
  // new season for a new team
  newTeam.save({ season })
    .then(() => 
      res.send(newTeam)
    )
}

// GET - fetch a current teams roster and past season data
function fetchRoster(req, res) {  
  const {seasonId, teamId} = req.query;
  
  Promise.all([
    getRoster(seasonId), 
    Season
      .find({team: teamId})
      .select('-games -players')
      .sort({ year: -1, quarter: -1 })
      .exec()
  ])
  .then(([team, seasons]) =>          
    res.send({ team })
  ); 
}

// PUT - update a team's info
function updateTeam(req, res) {
  const query = { team: req.params.teamId };
  
  Team.update(query, req.body)
    .exec()
    .then(() => 
      res.status(200).send('team updated')
    )
    .catch(err => { throw err })
}

// DELETE - remove a team from the database
function deleteTeam(req, res) {
  
  Team.findByIdAndRemove(req.params.teamId)
    .exec()
    .then(() => 
      res.status(200).send('Team removed')
    )
    .catch(error => { throw error })
}


Router.route('/search')
  .get(fetchRoster)

Router.route('/create')
  .post(createTeam)

Router.route('/update/:teamId')
  .put(updateTeam)

Router.route('/delete/:teamId')
  .delete(deleteTeam)


module.exports = Router;  
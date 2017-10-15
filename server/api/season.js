const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Players = mongoose.model('player');
const Season = mongoose.model('season');

const ObjectId = mongoose.Types.ObjectId;

const getCheckins = require('./aggregate/player-checkins'); 
const getPlayers = require('./aggregate/availablePlayers');  
const getRoster = require('./aggregate/roster');

//Fetch any players in the database that are not currently 
//apart of any team within a specific season
Router.route('/available-players')
  .get((req,res) => {

    const { quarter, year } = req.query;
    req.session.game = { quarter, year };

    getPlayers(+quarter, +year)
      .then(players => res.send(players))
      .catch(err => { throw err })
  })  

Router.route('/search').get((req,res) => {
  let query = req.query;

  if (req.query._ids) {
    query = {
      _id: { $in: req.query._ids}
    }
  }

  Season.find(query)
    .select('players')
    .exec()
    .then(seasons => res.send(seasons))
});




Router.route('/create').post(function(req, res) {
  const { seasons, gameSeasons, players = [] } = req.body;

  Season.create(seasons)
    .then(() => Season.create(gameSeasons)) 
    .then((t) => getCheckins([t[0]._id, t[1]._id], true))
    .then(teams => res.send(teams))
})


// Get list of players, check if they can check in to a game
Router.route('/checkins')
  .get((req, res) => {
    
    const { team1, team2 } = req.query;
    const ids = [team1, team2];
    getCheckins(ids)
      .then(teams => res.send(teams))

  }) 

  

Router.route('/roster/remove').put((req, res) => {
  const { playerId, seasonId } = req.body;

  Season.findByIdAndUpdate(seasonId, {$pull: {players: playerId }})
    .exec()
    .then(() => getCheckins([seasonId]))
    .then(roster => res.send(roster))
})

Router.route('/roster/add').put((req, res) => {

  const { season, playerId, teams } = req.body;
  const { quarter, year } = season;
  
  const query = { quarter, year, players: {$in: [ playerId ]} };

  Season.find(query)
    .then(seasons => {

      //Player is currently on another team and needs to be swapped
      if (seasons.length !== 0) {
        console.log('swapping', seasons.length)
        return swapTeamsForGame(season, playerId, teams)
      }
      else {
        console.log('adding');
        return addToTeam(season, playerId, teams)
      }
    })
    .then(x => res.send(x))

})


Router.route('/roster/swap').put((req, res) => {
  const { playerId, newSeasonId, oldSeasonId } = req.body;
  //Remove player from current roster, push to formerPlayers list
  const update1 = {
    $pull: { players: playerId },
    $addToSet: { formerPlayers: playerId }
  };
  
  //Add to new roster
  const update2 = {
    $addToSet: { players: playerId },
    $pull: { formerPlayers: playerId}
  };


  Promise.all([
    Season.findByIdAndUpdate(newSeasonId, update2).exec(),
    Season.findByIdAndUpdate(oldSeasonId, update1).exec()
  ])
  .then(() => res.send('Player\'s teams swappped'))
  .catch(err => {throw err})
})

Router.route('/roster/remove-player').put((req, res) => {

  const update = {
    $pull: { players: req.body.playerId },
    $addToSet: { formerPlayers: req.body.playerId }
  };
  
  Season.findByIdAndUpdate(req.body.seasonId, update)
    .exec()
    .then(() => res.send('Player removed'))
})

Router.route('/roster/add-player').put((req, res) => {
  const { playerId, seasonId } = req.body;

  Season.findByIdAndUpdate(seasonId, {$push: {players: playerId }})
    .exec()
    .then(() => res.send('Player removed'))
})

Router.route('/roster/add-many').put((req, res) => {
  const { seasonId, newPlayers, quarter, year } = req.body;

  const update = { 
    $pullAll: { formerPlayers: newPlayers },
    $addToSet: { players: { $each: newPlayers }}
  };

  const query = {
    quarter,
    year,
    _id: {$ne: seasonId},
    players: {$in: newPlayers}
  };

  const update1 = {
    $pullAll: { players: newPlayers },
    $addToSet: { formerPlayers: { $each: newPlayers }}    
  };

  Season.update(query, update1, {multi: true}).exec()
    .then(() => 
      Season.findByIdAndUpdate(seasonId, update).exec()
    )
    .then(() => res.send('success'))
    .catch(err => res.send(err).status(500))
          
});

Router.route('/roster/remove-many').put((req, res) => {
  const { seasonId, oldPlayers } = req.body;

  const update = { 
    $pullAll: { players: oldPlayers },
    $addToSet: { formerPlayers: { $each: oldPlayers }}
  };

  Season.findByIdAndUpdate(seasonId, update)
    .exec()
    .then(() => res.send('added players'))
});

function swapTeamsForGame(newSeason, playerId, teams) {
  const { quarter, year, _id } = newSeason;
  
  //Find player's team for specific year & quarter
  const query = { quarter, year, players: {$in:[playerId]} };
  
  //Remove player from current roster, push to formerPlayers list
  const update1 = {
    $pull: { players: playerId },
    $addToSet: { formerPlayers: playerId }
  };
  
  //Add to new roster
  const update2 = {
    $addToSet: { players: playerId },
    $pull: { formerPlayers: playerId}
  };


  return Season.update(query, update1)
    .exec()
    .then(() => Season.update({ _id }, update2).exec())
    .then(() => getCheckins(teams))
}

function addToTeam(newSeason, playerId, teams) {
  const { quarter, year, _id } = newSeason;

  return Season.update(newSeason, { $push: { players: playerId }})
    .exec()
    .then(() => getCheckins(teams))
      
}

Router.route('/').get((req, res) => {

  Season.find(req.query)
    .sort({year: -1, quarter:-1})
    .exec()
    .then(data => res.send(data))
    .catch(err => res.send(err).status(500))

});

module.exports = Router;

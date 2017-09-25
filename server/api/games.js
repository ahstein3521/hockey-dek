const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Players = mongoose.model('player');
const Game = mongoose.model('game');
const ObjectId = mongoose.Types.ObjectId;
const getCheckins = require('./aggregate/player-checkins'); 


function f(req, res) {
  Season.remove({quarter:1, year:2016}).then(() =>
    Season.find({players: { $in: [req.params.playerId] }})
      .populate({path:'team', select:'name hockeyType'})
      .select('-players -formerPlayers')
      .sort({year:-1, quarter:-1})
      .exec()
      .then( seasons => res.send(seasons))
      .catch( err => Promise.reject(String(err)))
    )
}


function findGame(req, res, next) {
  let gameId;
  let checkIns = {};
  let { date, team1, team2 } = req.body.game;
  date = new Date(date);
  const y = date.getFullYear();
  const d = date.getDate();
  const m = date.getMonth();


  const query = {
    date: {"$gte": new Date(y, m, d), "$lt": new Date(y, m, d+1)},
    $or: [
      { 'team1.info': team1.info, 'team2.info': team2.info },
      { 'team2.info': team1.info, 'team1.info': team2.info }
    ]
  }

  Game.find(query).exec()
    .then(games => {
      if (!games.length) {
        
        return Game.create(req.body.game)
          .then(game => {
            const [team1, team2] = [game.team1.info, game.team2.info];
            gameId = game._id;

            return getCheckins([team1, team2])
          })
      } else {
        const { team1, team2, _id } = games[0];

        const players = team1.checkIns.concat(team2.checkIns);

        players.forEach( player => {
          checkIns[player] = true;
        })
        gameId = _id;

        console.log('game exists')
        return getCheckins([team1.info, team2.info])
      }
    })
    .then(teams => {
      res.send({teams, gameId, checkIns});
    })
}


function handleCheckIn(req, res, next) {
  const { gameId, playerId, selectedTab, isInputChecked } = req.body;
  const action = isInputChecked? '$push' : '$pull';

  const update = {
    [action]: {
      [`team${selectedTab}.checkIns`]: playerId
    }
  };

  Game.findByIdAndUpdate(gameId, update)
    .exec()
    .then(() => res.send({gameId}).status(200))
    .catch(err => { throw error })
}

//GET a list of teams for a new game
function fetchTeams(req, res, next) {
  let { hockeyType, quarter, year } = req.query;
  quarter = parseInt(quarter);
  year = parseInt(year)

  //Filter all seasons to match a specific quarter & year
  //Filter that subset by hockey type 
  Season.aggregate([
    {$match: { quarter, year }},
    {$lookup: 
      {from:"teams", 
      foreignField:'_id', 
      localField:'team', 
      as:'team' }
    },
    {$unwind: "$team"},
    {$match: { "team.hockeyType" : hockeyType}},
    {$project: {
      teamName: "$team.name",
      values: {
        name: "$team.name",
        _id: "$_id"
      }
    }}
  ]).exec()
  .then(teams => {
    if (teams.length === 0) {
      Team.find({hockeyType})
        .populate('currentSeason')
        .lean()
        .exec()
        .then(teams => {
          let teamArr = [];
          teams.forEach(team =>{
            teamArr.push({
              teamName: team.name,
              values: {
                name: team.name,
                players: team.currentSeason.players,
                _id: team._id,
                checked: false
              }
            })
          })
          res.send({ teams: teamArr, new: true });
        })
    } else {
      res.send({teams});
    }
    
  })
}

function deleteGame(req, res) {
  const { gameId } = req.params;
  const query = { games: { $in: [gameId] }}
  const update = {
    $pull: {
      games: gameId
    }
  };

  Game.findByIdAndRemove(gameId)
    .then(() =>
      Season.update(query, update, {multi: true}).exec()
    )
    .then(data => res.send(data))
    .catch(err => { throw err });
}

Router.route('/:gameId').delete(deleteGame);
Router.route('/new').post(findGame);
Router.route('/check-in').put(handleCheckIn);
Router.route('/teams').get(fetchTeams);


module.exports = Router;
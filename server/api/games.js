const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Players = mongoose.model('player');
const Game = mongoose.model('game');
const ObjectId = mongoose.Types.ObjectId;
const getCheckins = require('./aggregate/player-checkins'); 

function newGame(req, res, next) {
  let gameId;
  console.log(req.body);
  Game.create(req.body.game)
    .then(game => {
      const [team1, team2] = [game.team1.info, game.team2.info];
      gameId = game._id;

      return getCheckins([team1, team2])
    })
    .then(teams => {
      let [t1, t2] = teams.slice();
      if (t1._id === req.body.team1._id) {
        t1.name = req.body.team1.name;
        t2.name = req.body.team2.name;
        t1.teamNumber = 'team1';
        t2.teamNumber = 'team2';
      } else {
        t1.name = req.body.team2.name;
        t2.name = req.body.team1.name;
        t1.teamNumber = 'team2';
        t2.teamNumber = 'team1';
      }
      res.send({teams:[t1, t2], gameId});
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

Router.route('/show').get((req,res) => {
  const q = { year:2017, quarter: 2};

  Game.findOne({_id: '59b41b9e7844080355c5eea4'})
    .populate('team1.checkIns team1.info team2.info team2.checkIns')
    .exec()
    .then(x=>res.send(x))
})

function addPlayer(req, res, next) {
  const { quarter, year, _id } = req.body;
  const { playerId} = req.params;
  // Team.findOne({name: 'Philadelphia Flyers'})
  //   .populate({ path: 'currentSeason', populate: { path: 'players', select: 'firstName lastName'}})
  //   .exec()
  //   .then(x=> res.send(x))
  const now = new Date();

  Season.update({
    quarter:2, 
    year:2017, 
    players: { $in: [playerId]}}, 
    {$pull: {players: playerId}})
    .exec()
    .then(() =>
      Season.update({ _id }, {$push: { players: playerId }}).exec()
    )
  


  const select = {
    suspensions: {
      $elemMatch: { 
        start: { $lte: now},
        end: { $gt: now}
      }
    },
    firstName:1,
    lastName:1,
    jerseyNumber:1,
    payments:1,
  };

  Players.findById(req.params.playerId)
    .select(select)
    .lean()
    .exec()
    .then(x => {
      const payments = [];
      const comps = [];
      const totals = { paid: 0, comped: 0, total: 0};
      
      x.payments.forEach(payment => {
        if (payment.quarter === quarter && payment.year === year) {
          let p = { date: payment.date.toDateString(), amount: payment.amount };
          if (payment.kind === 'payment') {
            p.type = payment.paymentType;
            payments.push(p);
            totals.paid+=payment.amount;
          } else {
            p.reason = payment.reason;
            comps.push(p);
            totals.comped += payment.amount
          }
          totals.total+=payment.amount;
        }
      })
      x.suspended = x.suspensions? true : false;
      x.fullName = x.lastName + ', ' + x.firstName;
      if (!payments.length) {
        let newPayment = { quarter, year, kind:'payment' };
        payments.push(newPayment);
        Player.findByIdAndUpdate(playerId, {$push: {payments: newPayment }})
      }
      res.send(Object.assign({}, x, {payments, comps, totals}))
    })  
}

Router.route('/new').post(newGame);
Router.route('/check-in').put(handleCheckIn);
Router.route('/teams').get(fetchTeams);
Router.route('/add-player/:playerId').put(addPlayer);

module.exports = Router;
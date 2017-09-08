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
})

Router.route('/create').post(function(req, res) {
  const { seasons, gameSeasons } = req.body;
  const newPayment = {
    quarter: seasons[0].quarter,
    year: seasons[0].year,
    kind: 'payment'
  };
  const query = {
    $or: [
      {_id: { $in: gameSeasons[0].players}},
      {_id: { $in: gameSeasons[1].players}}
    ]
  };
  const update = {$push: { payments: newPayment}}

  Season.create(seasons)
    .then(() => Players.update(query, update, { multi: true }).exec())
    .then(() => Season.create(gameSeasons)) 
    .then((t) => getCheckins([t[0]._id, t[1]._id])
    .then(teams => res.send(teams)))
})

Router.route('/clear').get((req,res) => {
  const query = {'payments.year': 2017, 'payments.quarter':3 };
  Players.update(query, {$pull: {payments: {year:2017, quarter:3}}}, {multi: true})
  .exec()
  .then(x =>{
    console.log(x);
    Season.remove({ quarter: 3, year: 2017}).then(c => res.send(c))
  })
})

// Get list of players, check if they can check in to a game
Router.route('/checkins')
  .get((req, res) => {
    const { team1, team2 } = req.query;
    
    getCheckins([team1, team2])
      .then(teams => res.send(teams))
  }) 


//Update a teams roster
Router.route('/update/roster/:seasonId')
  .put((req, res) => {
    const { seasonId } = req.params;
    const { added, removed, quarter, year } = req.body;

    const addPlayers = {
      $push: { 
        formerPlayers: { $each: removed }, 
        players: { $each: added }         
      }      
    };

    const removePlayers = {
      $pull: {
        players: { $in: removed }, 
        formerPlayers: { $in: added } 
      }      
    };

    //Find players that have no payment record for this season
    const playerQuery1 = { 
      _id: { $in: added },
      payments: {$not: { $elemMatch: { quarter, year }}}
    };

    //Find players that have a payment record for another team this season
    // const playerQuery2 = {
    //   _id: { $in: added },
    //   payments: { $elemMatch: { quarter, year }}
    // };
    // //Create a new payment record for this season
    
    const newPayment = {
      $push: {
        payments: {
          quarter,
          season: seasonId,
          year
        }
      }
    };
    // //Transfer payment info to this season
    // const updatePayment = {
    //   $set: {
    //     'payments.$.season' : seasonId
    //   }
    // }

    Promise.all([
      Season.update({ _id: seasonId }, addPlayers).exec(),
      Season.update({ _id: seasonId }, removePlayers).exec(),
      Players.update(playerQuery1, newPayment, { multi: true }).exec(),
      // Players.update(playerQuery2, updatePayment, options).exec()
    ])
    .then((results) => {
        res.send(results);  
    })
  })      


Router.route('/roster/add').get((req, res) => {
  const playerId = '59013aeb0248742238a787ff';
  const quarter = 2;
  const year = 2017;
  const seasonId1 = "5918b320bf71fe8fea57d3cb"
  const seasonId2 = "5918b320bf71fe8fea57d3cc";

  const newSeason = { quarter, year, _id: seasonId1 }
  const q = { quarter, year, players: {$in: [ playerId ]} };

  Season.find(q)
    .then(seasons => {

      //Player is currently on another team and needs to be swapped
      if (seasons.length !== 0) {
        swapTeams(newSeason, playerId)
          .then(() => getCheckins([newSeason._id]))
          .then(x => res.send(x))
      }
      else {
        addToTeam(newSeason, playerId)
          .then(() => getCheckins([newSeason._id]))
          .then(x => res.send(x))  
      }
    })

})
// Season.find({ _id: seasonId2 }).populate({path:'players', select:'firstName'}).exec()
//           .then(x => res.send(x))
//})

function swapTeams(newSeason, playerId) {
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
    .then(() =>
      Season.update({ _id }, update2).exec()
    )
}

function addToTeam(newSeason, playerId) {
  const { quarter, year, _id } = newSeason;
  const newPayment = {
    quarter,
    year,
    kind: 'payment'
  }
  return Season.update(newSeason, { $push: { players: playerId }})
    .exec()
    .then(() => 
      Player.findByIdAndUpdate(
        {_id: playerId}, 
        {$push: 
          {payments: newPayment}
        })
        .exec()
    )
}

module.exports = Router;

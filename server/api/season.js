const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

const Season = mongoose.model('season');

const ObjectId = mongoose.Types.ObjectId;

const getCheckins = require('./aggregate/player-checkins'); 
  
Router.route('/show')
  .get((req,res) => {
   
    Season.find({})
      // .populate({path:'players',select:'firstName lastName'})
      // .populate({path:'team',select:'name'})
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


// Router.route('/update')
//   .get((req,res) => {
//       const Game = mongoose.model('game');

//       Game.find({})
//         .exec()
//         .then(games => {
//           games.forEach(game => {
//             console.log(game._id)
//             Season.update({ oldGames: {$in: [game.oldId]}}, {$pull: {oldGames: {$in: [null]}}})
//               .exec()
//           })
//           res.send('fixed') 
//         })
//         .catch(err => res.send(String(err)))
//   }) 



module.exports = Router;     
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose')
const Player = mongoose.model('player');
const Season = mongoose.model('season');
const getPlayerProfile = require("./aggregate/player-profile");


Router.route('/create')
  .post((req, res) => {
    const { newPlayer, seasonId } = req.body;

    Player.create(newPlayer)
      .then( player => {
        if (seasonId) {
          Season.findByIdAndUpdate(seasonId, { $push: { players: player._id }})
            .exec()
            .then(() => res.send(player))
            .catch(err => {throw err})
        } 
        else {
          res.send(player);
        }
      })
      .catch(err => { console.error('Error on /create', err)})
  })

//Fetch detailed player info regarding game checkin history
Router.route('/fetch/:_id')
  .get((req, res) => {
    
    const playerId = req.params._id;
   
    getPlayerProfile( playerId )
      .then(data => {
        const [player] = data;

        if (!player) {
          return res.redirect(`/player/fetch/new/${playerId}`);
        }

        res.send(player);
    })
    .catch(error => res.send(String(error)))
  })

//Fetch players with 0 team history
Router.route('/fetch/new/:_id')
  .get((req,res) => {
    Player.findById( req.params._id )
      .exec()
      .then(player => res.send({ basicInfo: player }))
      .catch(err => {throw err})
  })  

//Fetch first and last names for player search autocomplete
Router.route('/names')
  .get((req,res) => {
    Player.find({}, {firstName:1, lastName:1})
      .exec()
      .then(data => res.send(data))
  })

//Save updated player info to the db
Router.route('/update')    
  .put((req,res) => {
    const { query, update } = req.body;
      
    Player.update(query, update)
      .exec()
      .then(() => res.send(update))
      .catch(error => res.send({error:error}))
})


module.exports = Router;  
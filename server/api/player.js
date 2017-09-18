const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose')
const Player = mongoose.model('player');

const { getPastSeasons } = require('./player/common');
const getPlayerProfile = require("./aggregate/player-profile");

const getBasicInfo = require('./player/basicInfo')
const getPayments = require('./player/payments');
const getSuspensions = require('./player/suspensions');
const getCheckins = require('./player/games');


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


Router.route('/fetch/:playerId').get(getBasicInfo);
Router.route('/fetch/:playerId/suspensions').get(getSuspensions);
Router.route('/fetch/:playerId/payments').get(getPayments);
Router.route('/fetch/:playerId/games').get(getCheckins); 
module.exports = Router;  
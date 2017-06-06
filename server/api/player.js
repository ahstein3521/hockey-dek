const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose')
const Player = mongoose.model('player');
const getPlayerProfile = require("./aggregations/player-profile");
const _ = require('lodash');
const Season = mongoose.model('season');
const faker = require('faker');

//Fetch detailed player info regarding game checkin history
Router.route('/fetch/:_id')
  .get((req, res) => {
    
    const playerId = req.params._id;
   
    getPlayerProfile( playerId )
      .then(data => {
        const [player] = data;
        res.send(player);
    })
    .catch(error => res.send(String(error)))
  })

//Fetch first and last names for player search autocomplete
Router.route('/names')
  .get((req,res) => {
    Player.find({}, {firstName:1, lastName:1})
      .exec()
      .then(data => res.send(data))
  })

//Save updated player info to the db
Router.route('/update/:_id')    
  .put((req,res) => {
    const {_id} = req.params;
      
    Player.findByIdAndUpdate(_id, req.body )
      .exec()
      .then(() => res.send(req.body))
      .catch(error => res.send({error:error}))
})

Router.route('/suspension/:playerId')
  .get((req, res) => {

    const d = new Date()
    const {playerId} = req.params;
    const suspension = {
      to: d,
      from: d.setDate(d.getDate() - 7),
      reason: faker.lorem.paragraph()
    }
    Player.findByIdAndUpdate(playerId, {$push: {suspensions: suspension}})
      .exec()
      .then(() => Player.findById(playerId).exec().then(p => res.send(p)))
  })


module.exports = Router;  
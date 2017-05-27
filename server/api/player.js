const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose')
const Player = mongoose.model('player');
const getCheckins = require("./aggregations/player-checkin-history");
const _ = require('lodash');


//Fetch detailed player info regarding game checkin history
Router.route('/fetch/:_id')
  .get((req, res) => {
    
    const _id = req.params._id;

    Promise.all([
      Player.findOne({_id})
        .populate({
          path:'payments.season',
          select:'-players -id'
        })
        .exec(),
      getCheckins(_id)
    ])
    .then(data => {
      const [player, games] = data;
    
      res.send({ paymentInfo: player, games})
    })
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



module.exports = Router;  
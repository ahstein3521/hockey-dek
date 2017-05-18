const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const Players = mongoose.model('player');
const _ = require("lodash");
const ObjectId = mongoose.Types.ObjectId;

const getSeasons = (teamId, sId) => (
  Season
    .find({team:teamId})
    .select("formatted year quarter")
    .exec()
    .then(seasons => {
      let list = [];
      let currentSeason;
      seasons.forEach(season => {
        if(season._id != sId) list.push(season);
        else currentSeason = season;
      })
      return Promise.resolve({list, currentSeason})
    })
)

Router.route('/search/:seasonId/:teamId')
  .post((req, res) => {
    const {seasonId, teamId} = req.params;
    const {name, hockeyType} = req.body;
    
    Promise.all([
      Games.aggregate([
        { $match:{ teams:{ $in:[ObjectId(seasonId)] } } },
        { $unwind:"$players" },
        { $lookup:{ from:"players", localField:"players", foreignField:"_id", as:"players" }},
        { $unwind:"$players" },  
        { $group:{
            _id:"$players._id", 
            firstName:{$first:"$players.firstName"},
            lastName:{$first: "$players.lastName"},
            jerseyNumber:{$first: "$players.jerseyNumber"},
            email:{$first: "$players.email"},
            phone:{$first: "$players.phone"},
            checkIns:{$sum:1}
          }
        }
      ]).exec(),
      getSeasons(teamId, seasonId)
    ])
    .then(data => {
      const [players, seasons] = data;
      
      const result = {
        team: {
          name, 
          hockeyType, 
          players, 
          _id:teamId
        },
        seasons
      };
      
      res.send(result);
    
    });  
})
Router.route('/show')
  .get((req,res) => {
    Team.find({})
      .exec()
      .then(data => res.send(data))
})  

module.exports = Router;  
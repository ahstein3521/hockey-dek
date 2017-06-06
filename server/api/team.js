const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const Players = mongoose.model('player');
const startCase = require("lodash").startCase;
const ObjectId = mongoose.Types.ObjectId;

const getSettings = require('./aggregations/team-settings');
const getRoster = require('./aggregations/roster');

const getSeasons = (teamId, sId) => (
  Season
    .find({team:teamId})
    .select("year quarter")
    .exec()
    // .then(seasons => {
      
    //   const index = seasons.findIndex(season => season._id == sId);
    //   const selectedSeason = seasons[index];
    //   seasons.splice(index, 1);
      
    //   return Promise.resolve({list: seasons, selectedSeason})
    // })
)

Router.route('/settings/:seasonId/:teamId')
  .get((req, res) => {
    const {seasonId, teamId} = req.params;

    getSettings(seasonId, teamId)
      .then((data) => res.send(data))
      .catch(err => {throw err})
})

Router.route('/search/:seasonId/:teamId')
  .get((req, res) => {
    const {seasonId, teamId} = req.params;
    

    Promise.all([
      getRoster(seasonId),
      getSeasons(teamId, seasonId)
    ])
    .then(data => {      
      const [playerInfo, seasons] = data;
      
      res.send({ 
        team: playerInfo,
        seasons
      })
    });  
})

Router.route('/delete/:teamId')
  .delete((req, res) => {

     const { teamId } = req.params;

    Team.findByIdAndRemove( teamId )
      .exec()
      .then(() => res.status(200).send(teamId +' was successfully removed'))
      .catch(error => { throw error})
  })

Router.route('/create')
  .post((req, res) => {
    const { season, team: { name, hockeyType, _id } } = req.body;

    Team.findById(_id)
      .exec()
      .then(team => {
        if(team) {
          throw new Error('Duplicate team/hockeyType combo');
        }
        else{
          return Season.create(season)  
        }
      })
      .then( newSeason => {
        return Team.create({ 
          _id,
          name,
          hockeyType,
          currentSeason: newSeason._id
        })
      })
      .then(team => res.send(team))
      .catch(error => res.status(500).send({error}))
  });
 


Router.route('/show')
  .get((req,res) => {
    Team.find({})
      .exec()
      .then(data => res.send(data))
})  

module.exports = Router;  
const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

const d = new Date();

module.exports = ([team1, team2]) => Seasons.aggregate([
  //Get all the games played this season
  { $match: { _id: {$in: [ObjectId(team1), ObjectId(team2)]} }},
  { $unwind: "$players" },
  { $lookup: {from:"teams", foreignField:'_id', localField:'team', as:'team' }},
  { $unwind: "$team"},
  { $lookup: {from:"players", foreignField:"_id", localField:'players', as:'player' }},
  { $unwind: "$player" },
  { $project: 
    {
      team:1,
      player: {
        _id:"$player._id",
        firstName:"$player.firstName",
        lastName: "$player.lastName",
        jerseyNumber:"$player.jerseyNumber",        
        suspended: {
          $filter: {
            input: "$player.suspensions",
            as: "suspension",
            cond: {
              $and: [
                {$gte: [d, "$$suspension.start"]},
                {$lt: [d, "$$suspension.end"]}
              ]
            }
          }
        }
      }
    }
  },
  { $sort: {'player.lastName': 1}},
  { $group: 
    {
      _id: "$team._id",
      team: {
        $first: {
          name: '$team.name',
          season: "$team.currentSeason"
        }
      },
      players: { $push: "$player"}
    }
  }
  ]).exec()

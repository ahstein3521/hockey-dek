const mongoose = require('mongoose')
const Games = mongoose.model('game');
const ObjectId = mongoose.Types.ObjectId;

module.exports = seasonId => 
  Games.aggregate([
  //Get all the games played this season
  { $match: 
    { $or: [
      { "team1.info": ObjectId(seasonId) },
      { "team2.info": ObjectId(seasonId) }
    ]
    }
  },
  { $addFields: 
    {team: 
    { $concatArrays: 
      [
        '$team1.checkIns',
        '$team2.checkIns'
      ]
    }
  }},
  {
    $project: {
      team:1
    }
  },
  {
    $unwind: '$team'
  },
  {
    $group: {
      _id: '$team',
      total: {$sum: 1 }
    }
  }
  ]).exec()

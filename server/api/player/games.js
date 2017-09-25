const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const { sortBy, groupBy, sample, sampleSize } = require('lodash');

const formatDate = d => {
  let date = new Date(d);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

const seasonNames = ['', 'Winter', 'Spring', 'Summer', 'Fall'];

module.exports = function(req, res) {
  const playerId = ObjectId(req.params.playerId);

  Season.aggregate([
    { $match: 
      { $or: [
        { players: {$in: [ playerId ]}},
        { formerPlayers: { $in: [ playerId ]}}
        ]
      }
    },
  {$unwind: '$games'},
  { $lookup: { 
    from:"games", 
    localField:"games", 
    foreignField:"_id", 
    as:"games" }},
  { $unwind: '$games' },
  { $project: 
    { 
      quarter: 1,
      year: 1,
      team: 1,
      displayName: {
        $concat: [
          { $arrayElemAt: [['', 'Winter', 'Spring', 'Summer', 'Fall'], '$quarter']},
          ' ',
          { $substr: ['$year', 0, -1]}
        ]
      },      
      date: {$dateToString: { format: "%m-%d-%Y", date: "$games.date" }},
      gameId: '$games._id',
      attended: {
        $or: [
          { $setIsSubset: [[playerId], "$games.team1.checkIns"] },
          { $setIsSubset: [[playerId], "$games.team2.checkIns"] },
        ]
      }
    }
  },
  { $group:
    {
      _id: '$_id',
      season: {
        $first: {
          team: '$team',
          'quarter': '$quarter',
          'year': '$year',
          displayName: '$displayName',
          _id: '$_id' 
        } 
      },
      records: {
        $push: {
          date: '$date',
          attended: '$attended'
        }
      },
      totalAttended: { $sum: { $cond: ['$attended', 1, 0]}}
    }
  },
  {$lookup: {from:"teams", foreignField:'_id', localField:'season.team', as:'season.team' }},
  {$addFields: 
    {
      'season.team': {$arrayElemAt: ['$season.team', 0] }
    }
  },
  {$addFields: 
    {
      'season.team': '$season.team.name',
      'season.hockeyType': '$season.team.hockeyType'
    }
  }
  ]).exec()
  .then(x => res.send(x))
}


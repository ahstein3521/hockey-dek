 
var playerId = ObjectId("59013aea0248742238a78728");

var x = db.seasons.aggregate([
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
  { $addFields: 
    {
      gameTeam: {
        $cond: [
          {$setIsSubset: [ ['$games.team1.info'], ['$_id']]},
          '$games.team1',
          '$games.team2'
        ]
      }
    }
  },
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
      gameTeam: 1,
      attended: { $setIsSubset: [[playerId], "$gameTeam.checkIns"] },
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
          gameTeam: '$gameTeam',
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
  ]).toArray()

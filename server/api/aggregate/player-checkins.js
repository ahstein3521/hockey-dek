const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

const now = new Date();
  const unwind = field => ({$unwind: field});
  const lookup = (_from, foreignField, localField, _as) =>
    ({$lookup: { from: _from, foreignField, localField, as:_as }})

module.exports = ([team1, team2], isNew = false) => {
  
  const match1 = {$match: { _id: { $in: [ObjectId(team1), ObjectId(team2)]} }};
  const project1 = {
    quarter: 1,
    year: 1,
    team:1,
    player: {
    season:{
      _id:'$_id',
      quarter: '$quarter',
      year: '$year',
      team: '$team'              
    },
    _id: '$players._id',
    fullName:{$concat:['$players.lastName',', ','$players.firstName']},
      jerseyNumber:'$players.jerseyNumber',
      suspended: {
        $anyElementTrue:{
          $filter: {
            input: "$players.suspensions",
            as: "suspension",
            cond: {
              $and: [
                {$gte: [now, "$$suspension.start"]},
                {$lt: [now, "$$suspension.end"]}
              ]
            }
          }
        }                                  
      }            
    }         
  }
  const project2 = {
      quarter: 1,
      year: 1,
      team: 1,
      player: {
      season:{
        _id:'$_id',
        quarter: '$quarter',
        year: '$year', 
        team: '$team'           
      },
      _id: '$players._id',
      fullName:{$concat:['$players.lastName',', ','$players.firstName']},
      jerseyNumber:'$players.jerseyNumber',
      suspended: {
        $anyElementTrue:{
          $filter: {
            input: "$players.suspensions",
            as: "suspension",
            cond: {
              $and: [
                {$gte: [now, "$$suspension.start"]},
                {$lt: [now, "$$suspension.end"]}
              ]
            }
          }
        }                                  
      },
      payments: {
          $filter: {
            input: "$players.payments",
            as: "payment",
            cond: {
              $and: [
                {$eq: ['$$payment.year', '$year']},
                {$eq: ["$$payment.quarter", '$quarter']}
              ]}
            }
          }
      }                     
  };

  if (isNew) {
    return Seasons.aggregate([
      match1,     
      unwind('$players'),
      lookup('players', '_id', 'players', 'players'),
      unwind('$players'),
      {$project: project1 },
      lookup('teams', '_id', 'player.season.team', 'team'),
      {$group: {
        _id: "$player.season._id",
        team: { $first: {$arrayElemAt: ['$team', 0]}},
        quarter: { $first: '$player.season.quarter' },
        year: { $first: '$player.season.year' },
        players: {
            $push: {
              _id: "$_id",
              season: "$player.season",
              fullName:"$player.fullName",
              jerseyNumber: "$player.jerseyNumber",
              suspended:"$player.suspended",
              totals: {
                paid:0,
                comped:0,
                total:0
              }
            }
          }
        }
      },
      { $sort: { 'team.name': 1 }}            
    ]).exec()
  }


  return Seasons.aggregate([
    match1,
    // unwind('$teams'), 
    unwind('$players'),
    lookup('players', '_id', 'players', 'players'),
    unwind('$players'),
    {$project: project2 },     
    unwind('$player.payments'),
    {$group: {
      _id: "$player._id",
      player: { $first: '$player' },
      payments: { $addToSet: {
        $cond: [
          {$eq: ["$player.payments.kind", 'payment']},
          {
            amount: '$player.payments.amount',
            type: '$player.payments.paymentType',
            date: {$dateToString: { format: "%m-%d-%Y", date: "$player.payments.date" }}
          },
          false  
        ]   
      }},
      comps: { $addToSet: {
        $cond: [
          {$eq: ["$player.payments.kind", 'credit']},
          {
            amount: '$player.payments.amount',
            reason: '$player.payments.reason',
            date: {$dateToString: { format: "%m-%d-%Y", date: "$player.payments.date" }}
          },
          false  
        ]   
      }},        
      totalPaid: { $sum: {$cond: [{$eq: ['$player.payments.kind', 'payment']},'$player.payments.amount', 0]}},
      totalComped: { $sum: {$cond: [{$eq: ['$player.payments.kind', 'credit']},'$player.payments.amount', 0]}},
      totalSum: {$sum: '$player.payments.amount'}
      }
    },
    lookup('teams', '_id', 'player.season.team', 'team'),
    {$group: {
      _id: "$player.season._id",
      team: { $first: {$arrayElemAt: ['$team', 0]}},
      quarter: { $first: '$player.season.quarter' },
      year: { $first: '$player.season.year' },
      players: {
          $push: {
            _id: "$_id",
            season: "$player.season",
            fullName:"$player.fullName",
            jerseyNumber: "$player.jerseyNumber",
            suspended:"$player.suspended",
            payments: {$setDifference:["$payments",[false]]},
            comps: {$setDifference:["$comps", [false]]},
            totals: {
              paid:"$totalPaid",
              comped:"$totalComped",
              total:"$totalSum"
            }
          }
        },
      totalPaid: {$sum: '$totalPaid'},
      totalComped: {$sum: '$totalComped'}  
      }
    },
    { $sort: { 'team.name': 1 }}
  ]).exec()
}
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
    player: {
    season:{
      _id:'$_id',
      team: {$cond: [{$eq: ['$_id', ObjectId(team1)]}, 'team1', 'team2']},
      quarter: '$quarter',
      year: '$year',              
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
      player: {
      season:{
        _id:'$_id',
        team: {$cond: [{$eq: ['$_id', ObjectId(team1)]}, 'team1', 'team2']},
        quarter: '$quarter',
        year: '$year',              
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
      {$group: {
        _id: "$player.season._id",
        teamNumber: {$first: "$player.season.team"},
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
      }            
    ]).exec()
  }


  return Seasons.aggregate([
    match1,
    unwind('$players'),
    lookup('players', '_id', 'players', 'players'),
    unwind('$players'),
    {$project: project2 },     
    unwind('$payments'),
    {$group: {
      _id: "$player._id",
      player: { $first: '$player' },
      payments: { $addToSet: {
        $cond: [
          {$eq: ["$payments.kind", 'payment']},
          {
            amount: '$payments.amount',
            type: '$payments.paymentType',
            date: {$dateToString: { format: "%m-%d-%Y", date: "$payments.date" }}
          },
          false  
        ]   
      }},
      comps: { $addToSet: {
        $cond: [
          {$eq: ["$payments.kind", 'credit']},
          {
            amount: '$payments.amount',
            reason: '$payments.reason',
            date: {$dateToString: { format: "%m-%d-%Y", date: "$payments.date" }}
          },
          false  
        ]   
      }},        
      totalPaid: { $sum: {$cond: [{$eq: ['$payments.kind', 'payment']},'$payments.amount', 0]}},
      totalComped: { $sum: {$cond: [{$eq: ['$payments.kind', 'credit']},'$payments.amount', 0]}},
      totalSum: {$sum: '$payments.amount'}
      }
    },
    {$group: {
      _id: "$player.season._id",
      teamNumber: {$first: "$player.season.team"},
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
    }
  ]).exec()
}
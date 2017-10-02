const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

const d = new Date();

const getPaymentSum = kind =>
  ({$sum: 
    {$cond: [
      {$and:[
        {$eq:["$players.payments.kind", kind]},
        {$eq:["$players.payments.quarter", "$quarter"]},
        {$eq:["$players.payments.year", "$year"]}
      ]}, 
      "$players.payments.amount",0
    ]}
  })

const getPaymentNum = kind =>
  ({$push: 
    {$cond: [
      {$and:[
        {$eq:["$players.payments.kind", kind]},
        {$eq:["$players.payments.quarter", "$quarter"]},
        {$eq:["$players.payments.year", "$year"]}
      ]}, 
      "$players.payments",0
    ]}
  })

module.exports = seasonId => Seasons.aggregate([
  //Get all the games played this season
  { $match: { _id: ObjectId(seasonId) }},
  { $unwind: "$players" },
  //Populate each playerId from the destructured array with player's info
  { $lookup: { 
    from:"players", 
    localField:"players", 
    foreignField:"_id", 
    as:"players" }
  },
  //Destructure so populated player docs are objects rather than array
  { $unwind: "$players" },
  // //Destructure embedded 'payments' docs so they can be accessed
  { $unwind: 
    {
      path: "$players.payments", 
      preserveNullAndEmptyArrays: true 
    }
  },
  // // Filter out any player's payment records from other seasons
  //Group documents by player ids to total up the number of checkins for each player
  { $group: {
      _id:"$players._id",
      info:{ $first:"$players" },
      games: { $first: "$games" },
      paid: getPaymentSum('payment'),
      comped: getPaymentSum('credit'), 
      teamId: { $first: "$team" },
    }
  },
  // //Combine the players total checkins with the rest of the info needed to display on hte roster
  { $project: {
      player:{
        teamId:'$teamId',
        _id: "$info._id",
        firstName:"$info.firstName",
        lastName: "$info.lastName",
        fullName: {$concat: ["$info.firstName", " ", "$info.lastName"]},
        jerseyNumber:"$info.jerseyNumber",
        email: "$info.email",
        phone: "$info.phone",
        amountPaid: "$paid",
        amountComped: "$comped",
        suspended: {
          $anyElementTrue: {
            $filter: {
              input: "$info.suspensions",
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
      },
      games: 1, 
    }
  },
  {$unwind: 
    {
      path: "$games", 
      preserveNullAndEmptyArrays: true 
    }
  },
  { $lookup: { 
    from:"games", 
    localField:"games", 
    foreignField:"_id", 
    as:"games" }},
  {$unwind: 
    {
      path: "$games", 
      preserveNullAndEmptyArrays: true 
    }
  }, 
  { $group: {
    _id: "$player",
    checkins: {
      $sum: {
        $cond: [
          { $or: [
            { $setIsSubset: [["$player._id"], "$games.team1.checkIns"] },
            { $setIsSubset: [["$player._id"], "$games.team2.checkIns"] },
          ]}, 
          1, 0 
        ]
      }
      }
    }
  },     
  //Create an array of every player, and get totals for amount paid / amount comped 
  { $group: { 
      _id: "$_id.teamId",
      totalPaid: { $sum: '$_id.amountPaid'},
      totalComped: {$sum: '$_id.amountComped'},
      players: {
        $push: {
          player: '$_id',
          checkins: '$checkins'
        }
      }
    }
  }
  ]).exec()

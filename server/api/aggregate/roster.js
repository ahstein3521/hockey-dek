const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

module.exports = seasonId => Seasons.aggregate([
  //Get all the games played this season
  { $match: { _id: ObjectId(seasonId) }},
  //Destructure the players array in each Game document
  { $unwind: "$games" },
  { $lookup: { 
    from:"games", 
    localField:"games", 
    foreignField:"_id", 
    as:"games" }
  },    
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
  { $unwind: "$players.payments"},
  // Filter out any player's payment records from other seasons
  { $match: { "players.payments.season": ObjectId(seasonId)}},
  //Group documents by player ids to total up the number of checkins for each player
  { $unwind: "$games" },
  { $group: {
      _id:"$players._id",
      info:{ $first:"$players" },
      checkIns: { $sum: 
        {$cond:[
          { $setIsSubset: [["$players._id"], "$games.players"]},
        1, 0
      ]}},
      paid:{ $first: "$players.payments.amount" },
      comped: { $first: "$players.payments.comped"}, 
      teamId: { $first: "$team" },
    }
  },
  //Combine the players total checkins with the rest of the info needed to display on hte roster
  { $project: {
      player:{
        _id: "$info._id",
        firstName:"$info.firstName",
        lastName: "$info.lastName",
        fullName: {$concat: ["$info.firstName", " ", "$info.lastName"]},
        jerseyNumber:"$info.jerseyNumber",
        email: "$info.email",
        phone: "$info.phone",
        amountPaid: "$info.payments.amount",
        amountComped: "$info.payments.comped",
        checkIns:"$checkIns",           
      },
      comped:1,
      paid:1,
      teamId:1 
    }
  },  
  //Create an array of every player, and get totals for amount paid / amount comped
  { $group: { 
      _id: "$teamId",
      totalPaid: { $sum: '$paid'},
      totalComped: {$sum: '$comped'},
      players: {
        $addToSet: '$player'
      }
    }
  }
  ]).exec()



const mongoose = require('mongoose')
const Games = mongoose.model('game');
const ObjectId = mongoose.Types.ObjectId;

module.exports = seasonId => Games.aggregate([
    //Get all the games played this season
    { $match: { teams:{ $in: [ObjectId(seasonId)] }}},
    //Destructure the players array in each Game document
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
    //Destructure embedded 'payments' docs so they can be accessed
    { $unwind: "$players.payments"},
    // Filter out any player's payment records from other seasons
    { $match: { "players.payments.season": ObjectId(seasonId)}},
    //Group documents by player ids to total up the number of checkins for each player
    { $group: {
        _id:"$players._id",
        info:{ $first:"$players" },
        checkIns: { $sum:1},
        paid:{ $first: "$players.payments.amount" },
        comped: { $first: "$players.payments.comped"}, 
        season: { $first: "$players.payments.season" },
      }
    },
    //Combine the players total checkins with the rest of the info needed to display on hte roster
    { $project: {
        player:{
          _id: "$info._id",
          firstName:"$info.firstName",
          lastName: "$info.lastName",
          jerseyNumber:"$info.jerseyNumber",
          email: "$info.email",
          phone: "$info.phone",
          amountPaid: "$info.payments.amount",
          amountComped: "$info.payments.comped",
          checkIns:"$checkIns",           
        },
        comped:1,
        paid:1,
        season:1 
      }
    },  
    //Create an array of every player, and get totals for amount paid / amount comped
    { $group: { 
        _id: "$season",
        totalPaid: { $sum: '$paid'},
        totalComped: {$sum: '$comped'},
        players: {
          $addToSet: '$player'
        }
      }
    }
	]).exec()



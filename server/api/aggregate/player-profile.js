const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

module.exports = playerId =>

	Seasons.aggregate([
		//Get seasons associated with player
		{$match: 
      {$or: [
          {players: {$in: [ ObjectId(playerId) ]}},
          {formerPlayers: { $in: [ ObjectId(playerId) ]}}
        ]
      }
		},
		
		{$project: 
			{
				year:1,
				team:1,
				quarter:1,
				games:1,
				player: {
					$arrayElemAt:[
						{$filter:{
							input:{$concatArrays: ["$formerPlayers", "$players"] },
							as:'player',
							cond:{ $eq: ['$$player', ObjectId(playerId)] }
						}},0]	
				}
			}
		},
	 	{$lookup: {from:"players", foreignField:"_id", localField:'player', as:'player'}},
		{$unwind:"$games"},
		{$lookup: {from:'games', foreignField: '_id', localField: 'games', as: 'games'}},
		{$unwind:"$games"},
		{$lookup: {from:"teams", foreignField:'_id', localField:'team', as:'team' }},
		{$unwind: "$team"},		
		{$project: 
			{
				season:{
					year:"$year",
					quarter:"$quarter",
					team: {
						_id: "$team._id",
						name: "$team.name",
						hockeyType: "$team.hockeyType"
					}
				},
				player:{
					$arrayElemAt: ["$player", 0]
				},
				checkedIn:{
					date: {$dateToString: { format: "%m-%d-%Y", date: "$games.date" }},
					gameId: "$games._id",
					attended: { $setIsSubset:[[ObjectId(playerId)], "$games.players"] }
				}
			}
		},
		{$group: 
			{
				_id:"$season",
				basicInfo: {
					$first: {
						jerseyNumber:"$player.jerseyNumber",
						phone:"$player.phone",
						email: "$player.email",
						lastName:"$player.lastName",
						firstName:"$player.firstName",
						_id:"$player._id",
					}	
				},
				payment: {
					$first: 
						{$filter:{
							input:"$player.payments",
							as:"payment",
							cond:{ $eq: ["$$payment.season", "$_id"]}
						}
					}
				}, 
			checkIns:{$push:"$checkedIn"},
			totalPlayed:{$sum: {$cond: ["$checkedIn.attended", 1, 0]}}
		}
	},
	{$sort: { '_id.year':-1, '_id.quarter':-1}},
	{$group:
		{
			_id: "$basicInfo._id",
			basicInfo: {$first: "$basicInfo"},
			payments: {$push: {season: "$_id", record: {$arrayElemAt:["$payment",0]}}},
			games: {$push: {checkIns: "$checkIns", season:"$_id", totalPlayed: "$totalPlayed"}}
		}
	}
	]).exec();


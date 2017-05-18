const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

module.exports = playerId =>
	Seasons.aggregate([
		{$match: 
			{ players: {$in: [ObjectId(playerId)] } }
		},
		{$unwind:"$games" },
		{$lookup: 
			{
				from:'games', 
				foreignField: '_id', 
				localField: 'games', 
				as: 'games'
			}
		},
		{$unwind:"$games"},
		{$project: 
			{
				season:{
					team:"$team",
					year:"$year",
					quarter:"$quarter",
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
				checkIns:{$push:"$checkedIn"},
				totalPlayed:{$sum: {$cond: ["$checkedIn.attended", 1, 0]}}
			},
		},
		{$sort: { '_id.year':-1, '_id.quarter':-1}}
	]).exec();


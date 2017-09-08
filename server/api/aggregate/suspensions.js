const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

const seasons = ['', 'Winter', 'Spring', 'Summer', 'Fall'];

module.exports = playerId =>

	Seasons.aggregate([
		//Get seasons associated with player
		{ $match: 
      { $or: [
        { players: {$in: [ ObjectId(playerId) ]}},
        { formerPlayers: { $in: [ ObjectId(playerId) ]}}
        ]
      }
		},
		{	$project: {
				quarter:1,
				year:1,
				team:1,
				player: {$setUnion: ['$players', '$formerPlayers']}
			}
		},
		{ $lookup: {from:"teams", foreignField:'_id', localField:'team', as:'team' }},
		{ $unwind: '$player' },
		{ $match: {player: {$in: [ ObjectId(playerId) ]}}},
		{ $lookup: {from:"players", foreignField:"_id", localField:'player', as:'player'}},
		{ $unwind: '$player'},
		{ $unwind: '$player.suspensions' },
		{ $group: {
				_id: '$_id',
				season: { $first: {
					quarter:'$quarter',
					year:'$year',
					team:'$team.name',
					name: { $concat: [
            { $arrayElemAt: [seasons, '$quarter']},' ',
            { $substr: ['$year', 0, -1]}
          ]},
				}},
				records: { $push: {
					$cond: [
						{$eq: ['$player.suspensions.season','$_id']},
						'$player.suspensions', false
						]
				}}
			}
		}
	]).exec();


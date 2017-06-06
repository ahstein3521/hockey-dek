const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (seasonId, teamId) =>

Seasons.aggregate([

	{ $match: { team: teamId }},
 	{ $sort: { 'year':1, 'quarter':1}},
	{ $project: 
		{
			team:1,
			players:{ $cond: 
				{ if: { $eq: ['$_id', ObjectId(seasonId)] }, then: '$players', else: null }
			},
			season: { 
				//$switch operator is causing an error so I was forced to use a nested $cond ---not too pretty
				formatted: { 
					$cond: 
						{ if: { $eq: ['$quarter', 1]}, then:  {$concat: ['Winter ', {$substr:['$year',0,4]}]},
							else: {
								$cond: 
								{ if: { $eq: ['$quarter', 2]}, then: {$concat: ['Spring ', {$substr:['$year',0,4]}]},
								else: {
									$cond:
									{ if: { $eq: ['$quarter', 3]}, then: {$concat: ['Summer ', {$substr:['$year',0,4]}]},
										else: {
											$cond: {
												if: { $eq: ['$quarter', 4]}, then: {$concat: ['Fall ', {$substr:['$year',0,4]}]}, 
													else:null 
												}
											}
										}
									}
								}
							}
					}
				},	
				quarter:'$quarter', 
				year:'$year', 
				id:'$_id' 
			}
		}
	},
	{
		$group: {
			_id: '$team',
			seasons: {
				$addToSet:{
					$cond:{
						if: { $ne: ['$_id', ObjectId(seasonId)] },
						then: '$season',
						else: null	
					}
				}
			},
			currentSeason: {
				$addToSet: { 
					$cond:{
						if: { $eq: ['$_id', ObjectId(seasonId)] },
						then: '$season',
						else: null							
					}
				}
			},
			players: {
				$max: '$players'
			}
		}
	},
	{
		$project: {
			seasons: { $filter: { input: '$seasons', as: 'season', cond: { $ne: ['$$season', null]} }},
			currentSeason: { $max: '$currentSeason' },
			players: 1	
		}
	}
]).exec();
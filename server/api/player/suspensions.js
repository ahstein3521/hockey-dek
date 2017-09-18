const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const Season = mongoose.model('season');

const getPastSeasons = playerId =>
  Season.find({ $or: [ 
    {players: { $in: [playerId] }}, 
    {formerPlayers: { $in: [playerId]}}
    ]
  })
    .populate({path:'team', select:'name hockeyType'})
    .sort({year:-1, quarter:-1})
    .lean()
    .exec()



const getSuspensions = (seasons, playerId) => {
  const seasonNames = { 1: 'Winter', 2:'Spring', 3:'Summer', 4:'Fall' };
  
  let seasonsArray = [];
  seasons.forEach(({_id, team, quarter, year }) => {
    let s = { _id, quarter, year };
    s.teamId = team._id;
    s.team = team.name;
    s.displayName = seasonNames[quarter] + ' ' + year;
    s.hockeyType = team.hockeyType;
    seasonsArray.push(s)
  })

  return Player.aggregate([
    {$match: { _id: ObjectId(playerId) }},
    {$unwind: '$suspensions'},
    {$project: {
      sortIndex: '$suspensions.start',
      season: {
        $arrayElemAt: [
          {$filter: {
            input: seasonsArray,
            as: 's',
            cond: 
              {$eq: ['$$s._id', '$suspensions.season']}
                
            }
          }, 0
        ] 
      },      
      suspension: {
        startDate: '$suspensions.start',
        endDate: '$suspensions.end',
        start: {$dateToString: { format: "%m-%d-%Y", date: "$suspensions.start"}},
        end: {$dateToString: { format: "%m-%d-%Y", date: "$suspensions.end"}},
        reason: '$suspensions.reason',
        _id: '$suspensions._id'
      }
    }},
    {$sort: { sortIndex: 1}},
    {$group: { 
      _id: '$season._id', 
      season: {$first: '$season'}, 
      records: {$push: '$suspension'}}}
    ])
    .exec() 
}



module.exports = function(req, res) {
  //Player.find({}).select('suspensions').exec().then(x => res.send(x))
  const { playerId } = req.params;
  getPastSeasons(playerId)
    .then(seasons => getSuspensions(seasons,playerId))
    .then(suspensions => res.send(suspensions))
}

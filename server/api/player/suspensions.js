const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const Seasons = mongoose.model('season');

const { unionBy, pullAllWith, sortBy } = require('lodash');

const getSeasons = playerId => {
  const query = { $or: [ 
    {players: { $in: [playerId] }}, 
    {formerPlayers: { $in: [playerId]}}
    ]
  };

  return Seasons.find(query)
    .populate('team')
    .select('-games -players -formerPlayers')
    .sort({ year: -1, quarter: -1})
    .exec()  
}

const getSuspensions = playerId => 
  Player.findById(playerId)
    .select('suspensions')
    .exec()
    .then(doc => sortBy(doc.suspensions, 'start'))





module.exports = function(req, res) {
  const { playerId } = req.params;

  Promise.all([
    getSeasons(playerId),
    getSuspensions(playerId)
  ])
  .then(data => {
    const [seasons, suspensions] = data;
    let array = [];
    const pullCb = (s, val) =>
      s.quarter === val.quarter && s.year === val.year;
    
    seasons.forEach(season => {
      const { _id, quarter, year, formatted, team } = season; 
     
      const obj = {
        season: {
          _id,
          quarter,
          year,
          hockeyType: team.hockeyType,
          team: team.name,
          teamId: team._id,
          displayName: formatted
        },
        records: suspensions.filter(pullCb.bind(null, season))
      };
      
      array.push(obj)
    })
    res.send(array)
  })
}


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const { sortBy, groupBy, sample, sampleSize } = require('lodash');

const seedGames = require('./seed-games');

const formatDate = d => {
  let date = new Date(d);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

// module.exports = (req, res) => {
//   seedGames(req, res, 'clear')
// }

module.exports = function(req, res) {

  const { playerId } = req.params;
  const seasonNames = { 1: 'Winter', 2:'Spring', 3:'Summer', 4:'Fall' };

  // mongoose.model('player').find({firstName: 'Mel'}).exec().then(x => res.send(x))
  //seedGames(req, res);
  Season.find({ $or: [ 
    {players: { $in: [playerId] }}, 
    {formerPlayers: { $in: [playerId]}}
    ]
  })
    .populate({path:'team', select:'name hockeyType'})
    .populate({path: 'games'})
    .select('-players -formerPlayers')
    .sort({year:-1, quarter:-1})
    .lean()
    .exec()
    .then(seasons => {
      var seasonArray = []
      for (var i = 0; i < seasons.length; i++) {
        let { _id, formatted, games, team, quarter, year } = seasons[i];
        let season = { 
          _id, 
          quarter, 
          displayName: seasonNames[quarter] + ' ' + year,
          year, 
          team: team.name,
          playerId, 
          hockeyType: team.hockeyType,
          games: [],
          totalAttended: 0 
        };

        for (var j = 0; j < games.length; j++) {
              
          let _team = games[i].team1.info == _id? games[j].team1 : games[j].team2;
          let checkins = _team.checkIns;
          let attended = checkins.filter(v => v == playerId);
          season.games.push({
            date: formatDate(games[j].date),
            ts: Date.parse(games[j].date),
            info: team.info,
            attended: Boolean(attended.length),
          })
          season.totalAttended += attended.length;
        }
        season.games = sortBy(season.games, 'ts');
        seasonArray.push(season);
      }
      res.send(seasonArray);
    })      
} 


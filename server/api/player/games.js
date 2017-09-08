const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const buildList = require('./common').buildList;



const getGames = playerId =>
  
  function(_seasons) {
    playerId = ObjectId(playerId);
    let sIds = [];
    let seasons = [];

    _seasons.forEach(({_doc}) => {
      sIds.push(ObjectId(_doc._id))
      seasons.push(_doc)
    })

    const query = {
      $or: [
        {'team1.info': {$in: sIds}}, 
        {'team2.info': {$in: sIds}}
      ]
    }
    return Games.aggregate([
        { $match: query },
        // { $sort: { $date: 1 }},
        { $project: {
          date: {$dateToString: { format: "%m-%d-%Y", date: "$date"}},
          season: {
            $cond: 
              [
                { $setIsSubset: [ ['$team1.info'], sIds ] },
                  '$team1.info', '$team2.info'
              ]
          },
          attended: { 
            $or: [
              { $setIsSubset: [[playerId], "$team1.checkIns"] },
              { $setIsSubset: [[playerId], "$team2.checkIns"] },
            ]
          }}
        },
        { $group: {
            _id: '$season',
            games: {
              $push: {
                gameId: '$_id',
                date: '$date',
                attended: '$attended'
              }
            },
            total: {
              $sum: {$cond: ['$attended', 1, 0]}
            }
          }
        }
      ])
      .exec()
      .then(games => ({games, seasons}))
  }

module.exports = function(req, res) {
  const { playerId } = req.params;
  const processGames = getGames(playerId);
  
  Season.find({ $or: [
      {players: { $in: [playerId] }}, 
      {formerPlayers: { $in: [playerId]}}
    ]
  })
  .populate('team')
  .select('team quarter year')
  .sort({year: -1, quarter:-1})
  .exec()
  .then(processGames)
  .then(({games, seasons}) => {
    const list = buildList(seasons)
    games.forEach(game => list.addGame(game));
    res.send(list.getList());
      //res.send(games);
  })
  
} 


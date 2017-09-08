const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const Players = mongoose.model('player');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (quarter, year) => 
  Seasons.aggregate([
  //Get all the games played this season
  { $match: { quarter, year }},
  { $unwind: "$players" },
  { $group: {_id: '$year', players: { $push: '$players' }}}
  ])
  .exec()
  .then(([result]) => 
    Players.find({ _id: { $nin : result.players }})
      .select({ _id: 1, firstName: 1, lastName: 1 })
      .exec()
      .then(players => Promise.resolve(players))
  )




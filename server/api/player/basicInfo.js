const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const Season = mongoose.model('season');


const getCurrentSeason = playerId =>
  Season.findOne({players: { $in: [playerId] }, active: true })
    .select('team quarter year')
    .populate({path:'team', select:'name hockeyType'})
    .exec()

const getPlayerInfo = playerId => 
  Player.findById(playerId)
    .select('-suspensions -payments')
    .exec()


module.exports = function(req, res) {

  const { playerId } = req.params;
  
  Promise.all([
    getCurrentSeason(playerId),
    getPlayerInfo(playerId)
  ])
  .then(results => res.send(results))

}

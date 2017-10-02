const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const Seasons = mongoose.model('season');

const { uniqBy, sortBy } = require('lodash');

const getSeasons = playerId => {
  const query = { $or: [ 
    {players: { $in: [playerId] }}, 
    {formerPlayers: { $in: [playerId]}}
    ]
  };

  return Seasons.find(query)
    .select('-games -players')
    .sort({ year: -1, quarter: -1})
    .exec()
    .then(docs => uniqBy(docs, 'formatted'))  
}

const getPayments = playerId => 
  Player.findById(playerId)
    .select('payments')
    .lean()
    .exec()
    .then(doc => sortBy(doc.payments, 'date'))





module.exports = function(req, res) {
  const { playerId } = req.params;

  Promise.all([
    getSeasons(playerId),
    getPayments(playerId)
  ])
  .then(data => {
    const [seasons, payments] = data;
    let array = [];
    const pullCb = (s, kind, val) =>
      s.quarter === val.quarter && 
      s.year === val.year && 
      kind === val.kind;
    
    const add = (total, { amount }) => total += amount;

    seasons.forEach(season => {
      const { _id, quarter, year, formatted } = season; 
      const obj = {
        season: {
          _id,
          quarter,
          year,
          displayName: formatted
        },
        _payments: payments,
        comps: payments.filter(pullCb.bind(null, season, 'credit')),
        payments: payments.filter(pullCb.bind(null, season, 'payment'))
      };

      obj.totalPaid = obj.payments.reduce(add, 0);
      obj.totalComped = obj.comps.reduce(add, 0);
      array.push(obj)
    })
    res.send(array)
  })
}
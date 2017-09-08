const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const buildList = require('./common').buildList;

module.exports = function(req, res) {
  const { playerId } = req.params;
  const { player : { seasons }} = req.session;
  const ID = ObjectId(playerId);
  const seasonNames = ['', 'Winter', 'Spring', 'Summer', 'Fall'];
  const list = buildList(seasons, true);

  Player.aggregate([
    { $match: { _id: ObjectId(playerId) }},
    {$unwind: '$payments'},
    {$project: {
      sortIndex: '$payments.date',
      payment: {
        amount: '$payments.amount',
        date: {$dateToString: { format: "%m-%d-%Y", date: "$payments.date"}},
        reason: '$payments.reason',
        _id: '$payments._id',
        type: '$payments.paymentType',
        kind: '$payments.kind',
        season: {
          $concat: [
            { $arrayElemAt: [seasonNames, '$payments.quarter']},' ',
            { $substr: ['$payments.year', 0, -1]}
          ]
        },
      }
    }},
    {$sort: { sortIndex: 1}},
    {$group: { _id: null, payments: {$push: '$payment'}}}
    ])
    .exec()
    .then(([{payments}]) => {
      payments.forEach(payment => list.addPayment(payment)) 
      res.send(list.getList())
    })
} 
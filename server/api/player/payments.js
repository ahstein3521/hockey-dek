const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const { getPastSeasons, buildList } = require('./common');

const getTotal = kind => {
  return {
    $sum: {
      $cond: [
        {$eq: ['$payment.kind', kind]},
        '$payment.amount',
        0
      ]
    }
  }
};

const pushByType = type => {
  return {
    $push: {
      $cond: [
        {$and: [
          {$eq: ['$payment.kind', type]},
          {$ne: ['$payment.type', 'N/A']}
        ]},
        '$payment',
        0
      ]
    }
  }
};

const getPayments = ({ seasons, playerId }) => {
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
    { $match: { _id: ObjectId(playerId) }},
    { $unwind: '$payments'},
    { $project: {
      sortIndex: '$payments.date',
      payment: {
        amount: '$payments.amount',
        date: { $dateToString: { format: "%m-%d-%Y", date: "$payments.date"}},
        reason: '$payments.reason',
        _id: '$payments._id',
        type: '$payments.paymentType',
        kind: '$payments.kind'
      },
      season: {
        $arrayElemAt: [
          {$filter: {
            input: seasonsArray,
            as: 's',
            cond: {
              $and: [
                {$eq: ['$$s.quarter', '$payments.quarter']},
                {$eq: ['$$s.year', '$payments.year']}
              ]
            }}}, 
          0
        ]
      }
    }},
    {$sort: { sortIndex: 1}},
    { $group: { 
        _id: '$season._id', 
        season: {$first: '$season'}, 
        payments: pushByType('payment'),
        comps: pushByType('credit'),
        totalPaid: getTotal('payment'),
        totalComped: getTotal('credit'),
        total: { 
          $sum: '$payment.amount'
        }
      }
    },
    { $addFields: {
        payments: {$setDifference:["$payments",[0]]},
        comps: {$setDifference:["$comps", [0]]},
      }
    }
  ])
  .exec()
};

module.exports = function(req, res) {
  getPastSeasons(req.params.playerId)
    .then(getPayments)
    .then(payments => res.send(payments))
    .catch(err => res.send(err))
} 
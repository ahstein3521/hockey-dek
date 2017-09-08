const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const Players = mongoose.model('player');

const seasons = ['', 'Winter', 'Spring', 'Summer', 'Fall'];


const getPaymentSum = kind =>
  ({$sum: 
    {$cond: [{$eq:["$payments.kind", kind]},  "$payments.amount",0]}
  })

const getHistory = kind => ({
  $push: {
    $cond: [{$eq: ['$payments.kind', kind]}, '$payment', false]
  }
})

module.exports = playerId => Players.aggregate([
 
  { $match: { _id: ObjectId(playerId)}},
  { $unwind: '$payments' },
  { $project: { 
    payments: 1,
    quarter: '$payments.quarter',
    year:'$payments.year',
    payment: {
      amount: '$payments.amount',
      date: {$dateToString: { format: "%m-%d-%Y", date: "$payments.date" }},
      _id: '$payments._id',
      type: '$payments.paymentType',
      reason: '$payments.reason'
    },
    season: {
      $concat: [
        { $arrayElemAt: [seasons, '$payments.quarter']},' ',
        { $substr: ['$payments.year', 0, -1]}
      ]},
    }
  }, 
  { $group: 
    {
      _id: '$season',
      quarter: {$first: '$quarter'},
      year: {$first: '$year'},
      payments: getHistory('payment'),
      comps: getHistory('credit'),
      totalPaid: getPaymentSum('payment'),
      totalComped: getPaymentSum('credit')     
    }
  },
  {$sort: { 'year':-1, 'quarter':-1 }}, 
  { $project: {
      season:'$_id',
      totalComped:1,
      totalPaid:1,
      payments: { $setDifference: ['$payments', [false]]},
      comps: { $setDifference: ['$comps', [false]]},
    }
  }
  ]).exec()



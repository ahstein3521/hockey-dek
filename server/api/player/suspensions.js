const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Player = mongoose.model('player');
const buildList = require('./common').buildList;

module.exports = function(req,res){
  const { playerId } = req.params;
  const { player : { seasons }} = req.session;

  //res.send({ seasons })  
  
  const list = buildList(seasons, false);

  Player.aggregate([
    {$match: { _id: ObjectId(playerId) }},
    {$unwind: '$suspensions'},
    {$project: {
      sortIndex: '$suspensions.start',
      suspension: {
        start: {$dateToString: { format: "%m-%d-%Y", date: "$suspensions.start"}},
        end: {$dateToString: { format: "%m-%d-%Y", date: "$suspensions.end"}},
        reason: '$suspensions.reason',
        _id: '$suspensions._id',
        season: '$suspensions.season'
      }
    }},
    {$sort: { sortIndex: 1}},
    {$group: { _id: null, suspensions: {$push: '$suspension'}}}
    ])
    .exec()
    .then(([{ suspensions }]) => {
      suspensions.forEach(suspension => 
        list.addRecord(suspension, suspension.season)
      )
      res.send(list.getList())
    })
}
const mongoose = require('mongoose')
const Season = mongoose.model('season');

const makeMap = (array, prop) => 
  array.reduce((acc, val, i) => {
    acc[val[prop]] = i;  
    return acc;
  }, {})  



exports.buildList = (seasons, isPaymentList) => {

  let list = [];
  
  for (let i = 0; i < seasons.length; i++) {
    if (!isPaymentList) {
      list.push(Object.assign({}, seasons[i], { records: []}))
    
    } else if (i === 0 || seasons[i-1].formatted !== seasons[i].formatted) {
      list.push(Object.assign({}, seasons[i], {
        records: { 
          payments:[], 
          credits:[], 
          totals: { payment: 0, credit: 0 }}
        })
      )
    }    
  }
  
  const prop = isPaymentList? 'formatted' : '_id';
  const map = makeMap(list, prop);
  
  return {
    addRecord(doc, prop) {
      const index = map[prop];
      list[index].records.push(doc)   
    },
    addGame(doc) {
      const index = map[doc._id];
      list[index].records = doc;
    },
    addPayment(doc) {
      const { season } = doc;
      const index = list[map[season]];

      index.records[doc.kind+'s'].push(doc);
      index.records.totals[doc.kind] += doc.amount;
    },
    getList() { 
      return list;
    }
  }
}


exports.getPastSeasons = function(req, res, next) {
  const { playerId } = req.params;
  const { player } = req.session;
  
  if (!player || player._id !== playerId) {
    Season.find({players: { $in: [playerId] }})
      .populate({path:'team', select:'name hockeyType'})
      .select('-games -players -formerPlayers')
      .sort({year:-1, quarter:-1})
      .exec()
      .then( seasons => {
        req.session.player = {
          _id: playerId, 
          seasons
        }
        next();
      })
  } else {
    return next();
  }
}


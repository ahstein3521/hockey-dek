const mongoose = require('mongoose')
const Seasons = mongoose.model('season');
const ObjectId = mongoose.Types.ObjectId;


module.exports = ({ quarter, year, hockeyType }) => 
  Seasons.aggregate([
    {$match: { quarter, year }},
    {$lookup: {from:"teams", foreignField:'_id', localField:'team', as:'team' }},

  ]).exec()

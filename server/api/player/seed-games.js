const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Season = mongoose.model('season');
const Games = mongoose.model('game');
const { sortBy, groupBy, sample, sampleSize } = require('lodash');  

  // Games.remove({}).then(() => 
  //   Season.update({}, {$set: {games: []}}, {multi: true}).exec()
  // ).then(x=> res.send(x))
let dates = [
  new Date(2017, 2, 1),
  new Date(2017, 2, 7),
  new Date(2017, 2, 16),
  new Date(2017, 2, 23),
  new Date(2017, 2, 28),
  new Date(2017, 3, 4), 
  new Date(2017, 3, 7),
  new Date(2017, 3, 16),
  new Date(2017, 3, 23),
  new Date(2017, 3, 28),       
];

const clear = (req, res) => 
   Games.remove({}).then(() => 
    Season.update({}, {$set: {games: []}}, {multi: true}).exec()
  ).then(x=> res.send(x))


 const seed = (req, res) => 
//  Games.remove({}).then(() => 
//   Season.update({}, {$set: {games: []}}, {multi: true}).exec()
// ).then(x=> res.send(x))
  Season.find({ quarter: 2, year: 2017 })
    .populate('team')
    .lean()
    .exec()
    .then(seasons => {
      
      const { Dek, Roller } = groupBy(seasons, 'team.hockeyType')
      let count = seasons.reduce((acc, v) => ({...acc, [v._id]: 0}), {});
      const gameArray = [];
      Roller.forEach((team, i) => {
        
        let arr = Roller.filter(v => v._id !== team._id && count[v._id] <= 8 )
       
        for (let i = 0; i < arr.length; i++) {
          let game = {
            date: dates[i]
          };

          let otherTeam = sample(arr);
          game.team1 = {
            info: team._id,
            checkIns: sampleSize(team.players, 10)
          };
          
          game.team2 = {
            info: otherTeam._id,
            checkIns: sampleSize(otherTeam.players, 10)
          };

          gameArray.push(game);
          count[team._id]++;
          count[otherTeam._id]++;
          arr = Roller.filter(v => v._id !== team._id && count[v._id] <= 8 );
        } 
      })
      Dek.forEach((team, i) => {
        
        let arr = Dek.filter(v => v._id !== team._id && count[v._id] <= 8 )
       
        for (let i = 0; i < arr.length; i++) {
          
          let game = {
            date: dates[i]
          };

          let otherTeam = sample(arr);
          let team1 = {
            info: team._id,
            checkIns: sampleSize(team.players, 10)
          };
          let team2 = {
            info: otherTeam._id,
            checkIns: sampleSize(otherTeam.players, 10)
          };

          gameArray.push(game)
          count[team._id]++;
          count[otherTeam._id]++;
          arr = Dek.filter(v => v._id !== team._id && count[v._id] <= 8 );
        }
      })
      Games.create(gameArray)
        .then(x => res.send(x))
  }) 


module.exports = (req, res, action) => 
  action === 'clear'? clear(req, res) : seed(req, res)

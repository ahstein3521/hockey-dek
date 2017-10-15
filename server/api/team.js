const express = require('express');
const Router = express.Router();

const mongoose = require('mongoose');
const Team = mongoose.model('team');
const Season = mongoose.model('season');
const Players = mongoose.model('player');
const ObjectId = mongoose.Types.ObjectId;

const getRoster = require('./aggregate/roster');



// POST - create a new team
function createTeam(req, res) {
  const { season, team } = req.body;

  const newTeam = new Team(team);
  // pass a season object to the save method
  // the teamSchema has a pre-save hook that creates a brand
  // new season for a new team
  newTeam.save({ season })
    .then(() => 
      res.send(newTeam)
    )
}

// PUT - update a team's info
function updateTeam(req, res) {
  
  const { id } = req.params.id;
  console.log({ body: req.body, id });

  Team.findByIdAndUpdate(req.body._id, req.body)
    .exec()
    .then(() => 
      res.status(200).send('team updated')
    )
    .catch(err => { throw err })
}

// DELETE - remove a team from the database
function deleteTeam(req, res) {
  
  Team.findByIdAndRemove(req.params.teamId)
    .exec()
    .then(() => 
      res.status(200).send('Team removed')
    )
    .catch(error => { throw error })
}

Router.route('/clear').get((req, res) => {
  Season.update({}, {games: []}, {multi:true}).exec();
  mongoose.model('game').remove({}).then(x => res.send(x));
})

function fetchRosterBySeasonId(req, res) {
  const getGames = require('./aggregate/gameCount');
  const { id } = req.params;

  Promise.all([
    Season.findById(id)
      .populate('players')
      .populate('team')
      .select('players year quarter team')
      .exec(),
    getGames(id)
  ])
  .then(([{players, year, quarter, team, formatted}, gameCount])=> {
    const games = gameCount.reduce((obj, val) => 
      ({...obj, [val._id]: val.total }), {});

    function handlePayments() {
      let totals = {
        payment: 0,
        credit: 0
      };

      return (payments, kind, getTotals) => {
        if (getTotals) return totals;

         return payments.reduce((total, val) => {
          if (val.year === year && val.quarter === quarter && val.kind === kind) {
            totals[kind] += val.amount;
            return total + val.amount
          } else {
            return total;
          }
         }, 0); 
      }
    }
    
    let getPayment = handlePayments();

    let roster = players.map(player => {
      let comped = getPayment(player.payments, 'credit');
      let paid = getPayment(player.payments, 'payment');

      return { 
        _id: player._id,
        firstName: player.firstName,
        lastName: player.lastName,
        email: player.email,
        phone: player.phone,
        suspended: player.isSuspended,
        jerseyNumber: player.jerseyNumber,
        waiver: player.waivers.find(v => v.year === year),
        paid,
        games: games[player._id],
        comped,
        total: comped + paid
      };
    });
    const totals = getPayment(null, null, true);

    res.send({
      roster, 
      totals, 
      _id: team._id, 
      name: team.name,
      season: formatted, 
      currentSeason: team.currentSeason,
      slug: team.slug 
    });
  });
};

Router.route('/:id')
  .get(fetchRosterBySeasonId)
  .post(createTeam)
  .put(updateTeam)
  .delete(deleteTeam)

Router.route('/create')
  .post(createTeam)



Router.route('/delete/:teamId')
  .delete(deleteTeam)


module.exports = Router;  
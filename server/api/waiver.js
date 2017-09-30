const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Player = mongoose.model('player');

const processOnlineWaiver = function(req, res) {
	
	const { firstName, lastName, email } = req.body;
	const now = new Date()
	const year = now.getFullYear();
	
	const waiver = {
		year,
		format: 'online',
		createdAt: now,
	}

	const query = {
		firstName: new RegExp(firstName, 'gi'),
		lastName: new RegExp(lastName, 'gi'),
		email: new RegExp(email, 'gi')
	};

	Player.findOne(query)
		.exec()
		.then(player => {
			if (!player._id) {
				Player.create({ firstName, lastName, email, waivers: [waiver] })
					.then(() => res.send({ msg: 'A new player was created, and a waiver has been successfully submitted'}))
					.catch(err => res.send({ error: err}).status(500))
			} else if (player.waivers.some(v => v.year === year)) {
				res.send({error: 'A waiver for this player has already been submitted this year'})
			} else {
				Player.findByIdAndUpdate(player._id, { $push: { waivers: waiver }})
					.exec()
					.then(() => res.send({msg: 'An existing player has successfully submitted a waiver for this year'}))
			}
		})
} 


const handleCheckWaiver = function(req, res) {
	const { playerId, year } = req.body;
	
	const query = { _id: playerId };
	const update = {
		$push: {
			waivers: {
				year,
				format: 'paper',
				createdAt: Date.now()
			}
		} 
	}

	Player.update(query, update)
		.exec()
		.then(() =>
			Player.findById(playerId)
				.select({waivers: { $elemMatch: {year}}})
				.exec()
				.then(x => res.send(x))
				.catch(e => res.send(e).status(500))

		)
}

const handleUncheckWaiver = function(req, res) {
	const { waiverId, playerId } = req.body;

	const update = { $pull: { waivers: { _id: waiverId }}};

	Player.findByIdAndUpdate(playerId, update)
		.exec()
		.then(() => res.send('OK').status(200))
		.catch((err) => { throw err })
}


Router.route('/')
	.post(processOnlineWaiver)
	.put(handleCheckWaiver);

Router.route('/remove').put(handleUncheckWaiver);


module.exports = Router;
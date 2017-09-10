const mongoose = require('mongoose');
const Player = mongoose.model('player');

exports.processOnlineWaiver = function(req, res) {
	const { firstName, lastName, email } = req.body;
	
	const now = new Date()
	const year = now.getFullYear();
	
	const waiver = {
		year,
		format: 'online',
		createdAt: now,
	}

	const query = {
		firstName: new RegExp(firstName, 'i'),
		lastName: new RegExp(lastName, 'i'),
		email: new RegExp(email, 'i')
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


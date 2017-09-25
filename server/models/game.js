const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	date:{
		type:Date
	},
	team1: {
		info: { 
			type: Schema.Types.ObjectId, 
			ref: 'season' 
		},
		checkIns:[{
			type: Schema.Types.ObjectId, ref: 'player' 
		}]	
	},
	
	team2: {
		info: { 
			type: Schema.Types.ObjectId, 
			ref: 'season' 
		},
		checkIns:[{
			type: Schema.Types.ObjectId, ref: 'player' 
		}]	
	}
},	
	{
	  toJSON: {
  	virtuals:true,
    getters: true,
    setters: true,
  },
  toObject: {
  	virtuals:true,
    getters: true,
    setters: true,  	
  }
});

gameSchema.pre('save', function(next) {
	if (this.isNew) {
		const s1 = this.team1.info;
		const s2 = this.team2.info;

		mongoose.model('season')
			.update({_id: {$in: [s1, s2]}}, { $push: { games: this._id }}, {multi: true })
			.exec()
			.then(res => { 
				next()
			})
	} else {
		next()
	}
})

gameSchema.virtual('checkIns')
	.get(function() {
		return this.team1.checkIns.concat(this.team2.checkIns)
	})

gameSchema.statics.createRecord = function(gameId, playerId) {
	const _this = this;

	const formatDate = d => {
  	let date = new Date(d);
  	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	}

	return this.findById(gameId)
		.exec()
		.then(function(game) {
			console.log({game})
			return {
				attended: game.checkIns.includes(playerId),
				date: formatDate(game.date),
			}
		})
};


module.exports = mongoose.model('game',gameSchema)
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
	},	
}
// {
// 	  toJSON: {
//   	virtuals:true,
//     getters: true,
//     setters: true,
//   },
//   toObject: {
//   	virtuals:true,
//     getters: true,
//     setters: true,  	
//   }
// })
)

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


module.exports = mongoose.model('game',gameSchema)
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


module.exports = mongoose.model('game',gameSchema)
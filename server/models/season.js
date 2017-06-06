const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const maxYear = new Date().getFullYear() + 2;

const seasonArray = ['','Winter','Spring','Summer', 'Fall'];

const seasonSchema = new Schema({
	team:String,
	quarter: {
		type:Number, 
		min:1,
		max:4,
		get: v => seasonArray[v],
		set: v =>  Number(v) ? v : seasonArray.indexOf(v),
	},	
	year:{
		type:Number, 
		min: 2000,
		max: maxYear  
	},
	
	players:[{
		type: Schema.Types.ObjectId, 
		ref: 'player'
	}],
	games:[{
		type: Schema.Types.ObjectId, 
		ref: 'game'
	}]
},
{
  toJSON: {
    getters: true,
    setters: true,
  }
});



module.exports = mongoose.model('season',seasonSchema)
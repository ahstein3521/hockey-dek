const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UpdateRoster = require('./plugins/updateRoster');

const seasonSchema = new Schema({
	team:{
		type: Schema.Types.ObjectId,
		ref: 'team'
	},
	quarter: {
		type:Number, 
		min:1,
		max:4
	},	
	year: Number,
	active: Boolean,
	players:[{
		type: Schema.Types.ObjectId, 
		ref: 'player'
	}],
	formerPlayers:[{
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
  	virtuals:true,
    getters: true,
    setters: true,
  }
});

const seasonArray = [null, 'Winter','Spring','Summer', 'Fall' ];

seasonSchema.virtual('formatted')
	.get(function(){	
		const { quarter, year } = this;
		return `${seasonArray[quarter]} ${year}`;
	})
	.set(function(v){
		const vals = v.split(' ');
		this.quarter = seasonArray.indexOf(vals[0]);
		this.year = parseInt(vals[1]);
	})

seasonSchema.statics.updateRoster = UpdateRoster;

module.exports = mongoose.model('season',seasonSchema)
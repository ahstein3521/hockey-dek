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
	active: {
		type: Boolean,
		default:true
	},
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


seasonSchema.pre('save', function(next) {
	if (this.isNew) {
		let _id = this._id;
		let team = this.team;
		let query = {
			_id: { $ne: _id},
			team: this.team,
			active: true
		};
		mongoose.model('season')
			.update(query, {$set: {active: false}}, { multi: true })
			.exec()
			.then(() => 
				mongoose.model('team')
					.findByIdAndUpdate(team, {$set: { currentSeason: _id}})
					.exec()
			)
			.then(() => next())

	} else {
		return next()
	}
})


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
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const yearValidator = {
	validator(value){
		return /20(?=\d{2})/.test(value)
	},
	message:"Invalid year was submitted"
}

const seasonSchema = new Schema({
	team:String,
	quarter: {
		type:Number, 
		min:1,
		max:4
	},	
	year:{
		type:String, 
		validate:yearValidator 
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

class SeasonClass{
	//http://mongoosejs.com/docs/advanced_schemas.html
	get formatted(){
		const seasonArray = ['Winter','Spring','Summer', 'Fall'];
		const season = seasonArray[this.quarter - 1];
		return `${season} ${this.year}`;
	}

	static findTeamArchives(teamId){
		return this.find({team:teamId})
	}
}

seasonSchema.loadClass(SeasonClass);

module.exports = mongoose.model('season',seasonSchema)
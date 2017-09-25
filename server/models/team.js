const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Season = mongoose.model('season');

const kebabCase = require('lodash').kebabCase; 
const titleCase = require('./plugins/titleCase');

const teamSchema = new Schema({
	name: {
		type:String,
		trim:true
	},
	hockeyType: { 
		type:String, 
		enum: ['Roller', 'Dek']
	},
	currentSeason: {
		type:Schema.Types.ObjectId,
		ref:'season'
	},
})

teamSchema.plugin(titleCase, {fields: ['name']});


teamSchema.virtual('slug').get(function(){
	return kebabCase(`${this.name} ${this.hockeyType}`)
})


teamSchema.pre('save', function(next){
	const team = this;
	
	if (this.isNew) {
		const { quarter, year } = arguments[1];
		const newSeason = new Season();
		newSeason.team = this._id;
		newSeason.quarter = quarter;
		newSeason.year = year
		newSeason.save()
			.then(season => {
				team.currentSeason = season._id;
				return next();
			}
		);
	} else {
		return next();
	}
})

module.exports = mongoose.model('team',teamSchema)
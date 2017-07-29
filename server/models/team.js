const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const kebabCase = require('lodash').kebabCase; 
const titleCase = require('./plugins/titleCase');

const teamSchema = new Schema({
	name:{
		type:String,
		trim:true
	},
	hockeyType:{ 
		type:String, 
		enum: ['Roller', 'Dek']
	},
	currentSeason:{
		type:Schema.Types.ObjectId,
		ref:'season'
	}
})

teamSchema.plugin(titleCase, {fields: ['name']});

teamSchema.virtual('slug').get(function(){
	return kebabCase(`${this.name} ${this.hockeyType}`)
	//TODO////////////////
})

module.exports = mongoose.model('team',teamSchema)
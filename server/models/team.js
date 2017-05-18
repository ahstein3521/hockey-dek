const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const teamSchema = new Schema({
	_id:String,
	name:String,
	hockeyType:{ type:String, enum: ['Roller', 'Dek']},
	currentSeason:{
		type:Schema.Types.ObjectId,
		ref:'season'
	}
})


module.exports = mongoose.model('team',teamSchema)
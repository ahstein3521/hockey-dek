const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	date:{type:Date},
	teams:[{type: Schema.Types.ObjectId, ref: 'season'}],
	players:[{type: Schema.Types.ObjectId, ref: 'player'}]
})


module.exports = mongoose.model('game',gameSchema)
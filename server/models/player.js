const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const paymentSchema = require('./payment');

const waiverSchema = new Schema({ year:String },{timestamp:true})

const suspensionSchema = new Schema({
	from:Date,
	to:Date,
	reason:String,
	season:Schema.Types.ObjectId
}, {timestamps:true});

const nameFormat = {
	type:String,
	trim: true,
	required: true
}

const playerSchema = new Schema({
	firstName: nameFormat,
	lastName: nameFormat,
	email:{ 
		type:String, 
		unique:true
	},
	phone:{
		type:String, 
		unique:true
	},
	jerseyNumber:{
		type:Number, 
		min:0, 
		max:99
	},
	payments:[paymentSchema],
	waivers:[waiverSchema], 
	suspensions:[suspensionSchema]
})

module.exports = mongoose.model('player',playerSchema)
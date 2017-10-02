const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const paymentSchema = require('./payment');

const waiverSchema = new Schema({ 
	year: Number,
	createdAt: Date,
	format: {
		type: String,
		enum: ['paper', 'online']
	}
})

const suspensionSchema = new Schema({
	start:Date,
	end:Date,
	reason:String,
	quarter: Number,
	year: Number
},
{ 
	toJSON: {
		getters: true,
		setters: true,
	}}
);

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
		trim: true, 
		unique:true,
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
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
	season:Schema.Types.ObjectId,
});

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

const defaultPayment = new Schema({ 
	paymentType: { 
		type: String, 
		default: 'N/A' 
	}
})



// Use for regular payments
playerSchema.path('payments')
	.discriminator('payment', defaultPayment)

//Used for when a player is comped
playerSchema.path('payments')
	.discriminator('credit', new Schema({ reason: String }))


module.exports = mongoose.model('player',playerSchema)
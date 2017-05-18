const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const waiverSchema = new Schema({ year:String },{timestamp:true})

const paymentSchema = new Schema({
	payment_type:String,
	amount:Number,
	comped:Number,
	season:Schema.Types.ObjectId
}, {timestamp:true});

const suspensionSchema = new Schema({
	from:Date,
	to:Date,
	reason:String,
	season:Schema.Types.ObjectId
}, {timestamp:true});


const playerSchema = new Schema({
	firstName:String,
	lastName:String,
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
	team:{ 
		type: Schema.Types.ObjectId, 
		ref: 'team'
	},  
	payments:[paymentSchema],
	waivers:[waiverSchema], 
	suspensions:[suspensionSchema],
	seasons:[{type:Schema.Types.ObjectId, ref:'season'}]
})

module.exports = mongoose.model('player',playerSchema)
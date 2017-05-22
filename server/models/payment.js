const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//This schema will only be embedded within the playerScema
const paymentSchema = new Schema({
	paymentType:String,
	amount:{
		type:Number,
		default: 0,
		get: v => "$" + (v/100).toFixed(2),
		set: v => v * 100
	}, 
	comped:{
		type:Number,
		default: 0,
		get: v => "$" + (v/100).toFixed(2),
		set: v => v * 100		
	},
	season:Schema.Types.ObjectId
}, 
{timestamp:true});


module.exports = paymentSchema;

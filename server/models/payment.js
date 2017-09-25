const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//This schema will only be embedded within the playerScema


const paymentSchema = new Schema({
	date: {
		type: Date,
		default: new Date()
	},
	amount:{
		type:Number,
		default: 0	
	}, 
	year: Number,
	quarter: {
		min: 1,
		max: 4,
		type:Number
	}
},

{ 
	toJSON: {
		getters: true,
		setters: true,
	},
	discriminatorKey: 'kind'
});

// const playerPayment = new Schema({
// 	paymentType: {
// 		type: String,
// 		default: 'N/A'
// 	}
// })

// const creditSchema = new Schema({
// 	reason: {
// 		type: String
// 	}
// })

module.exports = paymentSchema;

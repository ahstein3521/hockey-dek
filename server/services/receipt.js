const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const mongoose = require('mongoose');
const Player = mongoose.model('player');
const { partition } = require('lodash');

let template = path.join(__dirname, './receipt.template.html');
let output = path.join(__dirname, './receipt.html');

const seasons = ['', 'Winter', 'Spring', 'Summer', 'Fall'];	

function processPlayerRecord(player) {
	let { firstName, lastName, email, payments } = player;
	
	return {
		fileName: `${new Date().toString()}-${lastName}-receipt.pdf`,
		header: `${firstName} ${lastName} &#183 ${email}`,
		records: payments
	};	
}


const paymentList = (req, res) => {
	const { year, quarter, playerId } = req.query;

	Player
		.findOne({_id: playerId})
		.select({
			firstName: 1,
			lastName: 1,
			email: 1,
			payments: 1
		})
		.exec()
		.then(processPlayerRecord)
		.then(({header, records, fileName}) => {
			fs.readFile(template, 'UTF-8', (err, data) => {

				if (err) throw err;

				let [payments, comps] = partition(records, { kind: 'payment'})

				let s = '';
				data = String(data);
				data = data.replace('#{FULL_NAME}', header)
										.replace('#{TIME_STAMP}', new Date().toString())
										.replace('#{SEASON_NAME}', `${seasons[quarter]} ${year}`)

				payments.forEach(p => {
					console.log(p);
					if (p.quarter == +quarter && p.year === +year) {
						s+= '<tr><td>' + p.date.toDateString() + '</td>';
						s+=	'<td>' + p.type + '</td>';
						s+= '<td>' + '$' + (p.amount/100).toFixed(2) + '</td></tr>';
					}
				});


				const html = data.replace('#{PAYMENTS}',s);
				pdf.create(html).toStream(function(err, stream){
			    res.setHeader('Content-type', 'application/pdf')
			    res.attachment(fileName);
					stream.pipe(res)
				})			
			})
		})
		.catch(err => { throw err });
}

const singlePayment = (req,res) => {
	const { paymentId } = req.params;
	
	Player.findOne({ 'payments._id': paymentId})
		.select({ 
			firstName: 1, 
			lastName: 1, 
			email: 1,
			payments: {
				$elemMatch: { _id: {$in: [paymentId] }}
			} 
		})
		.exec()
		.then(processPlayerRecord)
		.then(({header, records, fileName}) => {
			fs.readFile(template, 'UTF-8', (err, data) => {

				if (err) throw err;
				const d = new Date();
				const payment = Array.isArray(records)? records[0] : records;
				const { quarter, year } = payment;

				console.log({ records, payment });

				let html = String(data);
				html = html.replace('#{FULL_NAME}', header);
				html = html.replace('#{TIME_STAMP}', d.toString());
				html = html.replace('#{SEASON_NAME}', `${seasons[quarter]} ${year}`);

				let paymentString = `<tr><td>${d.toDateString()}</td><td>${payment.type}</td><td>$${(payment.amount/100).toFixed()}</td></tr>` 
				html = html.replace('#{PAYMENTS}', paymentString);


				pdf.create(html).toStream(function(err, stream){
			    res.setHeader('Content-type', 'application/pdf')
			    res.attachment(fileName);
					stream.pipe(res)
				})			
			})			
		})	
}

module.exports = { paymentList, singlePayment };

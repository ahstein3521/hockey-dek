const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const mongoose = require('mongoose');
const Player = mongoose.model('player');
const { partition } = require('lodash');

let template = path.join(__dirname, './receipt.template.html');
let output = path.join(__dirname, './receipt.html');


const getPaymentInfo = playerId => 
	Player
		.findOne({_id: playerId})
		.select({
			firstName: 1,
			lastName: 1,
			email: 1,
			payments: 1
		})
		.exec()
		.then(player => {
			let { firstName, lastName, email, payments } = player;


			return {
				fileName: `${new Date().toString()}-${lastName}-receipt.pdf`,
				header: `${firstName} ${lastName} &#183 ${email}`,
				records: payments
			};
		})


module.exports = (req, res) => {
	const { year, quarter, playerId } = req.query;
	getPaymentInfo(playerId)
		.then(({ header, records, fileName}) => {
			fs.readFile(template, 'UTF-8', (err, data) => {

				if (err) throw err;

				let [payments, comps] = partition(records, { kind: 'payment'})

				let s = '';
				data = String(data);
				data = data.replace('#{FULL_NAME}', header)
										.replace('#{TIME_STAMP}', new Date().toString())

				payments.forEach(p => {
					console.log(p);
					if (p.quarter == +quarter && p.year === +year) {
						s+= '<tr><td>' + p.date.toDateString() + '</td>';
						s+=	'<td>' + p.paymentType + '</td>';
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
}

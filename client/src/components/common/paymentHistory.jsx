import React from 'react';

const PaymentTable = props => {
	const { payments } = props;
	return (
		<table style={{width: '100%'}}>		
			<thead>
				<tr>
					<td>Date</td>
					<td>Type</td>
					<td>Amount</td>
				</tr>
			</thead>
			<tbody>
				{
					payments.map((p,i) => 
						<tr key={i}>
							<td>{p.date}</td>
							<td>{p.type}</td>
							<td>{'$'+(p.amount/100).toFixed(2)}</td>
						</tr>
					)
				}
			</tbody>
		</table>
	)
}

export default PaymentTable;
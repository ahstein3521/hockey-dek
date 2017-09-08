import React from 'react';
import {List, ListItem} from 'material-ui/List';

const PaymentTable = props => {
	const { comps } = props;
	return (
		<List>
			{
				comps.map((p,i) => (
					<ListItem
						key={i}
						primaryText={
							<span style={{display:'flex'}}>
							<p>
								<b> Date: </b>
								{' '+p.date+' |  '}
							</p>
							<p style={{marginLeft:5}}>
								<b> {' Amount:'}</b>
								{' $'+(p.amount/100).toFixed(2)}
							</p>							
							</span>
						
						}
						secondaryText={
							<p>
								<b>Reason: </b> {p.reason}
							</p>
						}
					/>
				))
			}				
			</List>
	)
}

export default PaymentTable;
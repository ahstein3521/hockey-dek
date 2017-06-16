import React,{Component} from 'react';

import Card from './CardWrapper.jsx';


export default class PaymentList extends Component{
	render(){
		const { payments = []} = this.props;
  
		return(
		<div style={{width:'90%', margin:'0 auto 20px'}}> 		
			{
				payments.map(({record ={}, season={}},i) => (
          <Card season={season} key={i}>
          <table>
            <tbody>
            <tr>
              <th>Payement Type:</th>
              <td>{record.paymentType}</td>
            </tr>
            <tr>
              <th>Amount:</th>
              <td>{'$'+(record.amount/100).toFixed(2)}</td>
            </tr>
            <tr>
              <th>Comped:</th>
              <td>{'$'+(record.comped/100).toFixed(2)}</td>
            </tr>
            </tbody>
          </table> 
          </Card>
        ))
			}
		</div>
		)
	}
} 

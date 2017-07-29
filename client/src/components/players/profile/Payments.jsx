import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Card from './CardWrapper.jsx';

function $format(num, withSymbol = false) {
  const formattedVal = (num/100).toFixed(2);

  if (withSymbol) {
    return '$' + formattedVal;
  } 
  return formattedVal;
}

const PaymentList = props => {

	const { payments = [], openModal } = props;

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
                <td>{$format(record.amount, true)}</td>
              </tr>
              <tr>
                <th>Comped:</th>
                <td>{$format(record.comped, true)}</td>
              </tr>
              </tbody>
            </table> 
            <div className='btn-group'>
              <RaisedButton
                label="Update Payment?"
                primary={true}
                onTouchTap={() => 
                  openModal('UpdatePayment', { 
                    initialValues: { 
                      ...record, 
                      amount: $format(record.amount)
                    },
                    payments,
                    season 
                  }
                  )
                }
              />
            </div>  
          </Card>
        ))
  		}
  	</div>
  	)
}

export default PaymentList;
 

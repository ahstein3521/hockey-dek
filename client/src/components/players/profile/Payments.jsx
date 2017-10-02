import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Card from './CardWrapper.jsx';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import DollarIcon from 'material-ui/svg-icons/editor/attach-money';
import Avatar from 'material-ui/Avatar';
import { grey200 } from 'material-ui/styles/colors';

const $format = num => 
  (num/100).toFixed(2);

const fixDate = v => {
  const d = new Date(v);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

const renderPaymentRows = ({openModal, index, season}, val, i) => {
  const amount = $format(val.amount);
  const initialValues = { ...val, amount, season, currAmount: amount };
  return (
    <ListItem
      key={i}
      primaryTogglesNestedList={true}
      primaryText={
        <span style={{display:'flex', justifyContent:'space-around'}}>
          <p>{fixDate(val.date)}</p>
          <p>{`$${amount}`}</p>
          <p>{val.paymentType}</p>
          <IconButton onTouchTap={() => openModal('EditPayment', {initialValues, index, i} )}>
            <EditIcon/>
          </IconButton>
          <IconButton onTouchTap={() => openModal('DeletePayment', {val, index, i })}>
            <DeleteIcon/>
          </IconButton>
        </span>
      }
    />
  )
}
const renderCompedRows = ({openModal,index, season}, val, i) => {
  const amount = $format(val.amount);
  const initialValues = { ...val, amount, season, currAmount: amount };
  return (
    <ListItem
      key={i}
      primaryText={
        <span style={{display:'flex', justifyContent:'space-around'}}>
          <p>{fixDate(val.date)}</p>
          <p>{`$${amount}`}</p>
          <IconButton onTouchTap={() => openModal('EditCredit', {initialValues, index, i })}>
            <EditIcon/>
          </IconButton>
          <IconButton onTouchTap={() => openModal('DeletePayment', {val, index, i })}>
            <DeleteIcon/>
          </IconButton>
        </span>
      }
      primaryTogglesNestedList={true}
      secondaryText={val.reason}
      secondaryTextLines={2}
    />
  )
}



const PaymentList = props => {

	let { payments = [], openModal, playerId } = props;

  if (!payments) return <noScript />
  
	return (
  	<div style={{width:'90%', margin:'0 auto 20px', padding:10}}>	
  		{
  			payments.map(({ season, ...val}, i) => (
          <Card season={season} key={i} openModal={openModal} playerId={playerId}>
            <List>
              <ListItem
                primaryText='Paid: '
                secondaryText={'$'+$format(val.totalPaid)}
                style={{ backgroundColor: grey200 }}
                leftAvatar={<Avatar icon={<DollarIcon/>}/>}
                nestedItems={ val.totalPaid ?
                  [ 
                    <ListItem
                      key={-1}
                      disabled={true}
                      style={{height:25, padding: 8}}
                      primaryText={
                        <span style={{display:'flex', justifyContent:'space-around'}}>
                          <small>Date</small>
                          <small>Amount</small>
                          <small>Type</small>
                          <small>Update</small>
                          <small>Delete</small>
                        </span>
                      }
                    />,
                    ...val.payments.map(renderPaymentRows.bind(null, { openModal, index:i, season}))
                  ] : []
                }
              />
              <ListItem
                primaryText='Comped: '
                style={{ backgroundColor: grey200 }}                
                leftAvatar={
                  <Avatar icon={<DollarIcon/>}/>
                }                
                secondaryText={$format(val.totalComped)}
                nestedItems={
                  val.totalComped ?
                  [
                    <ListItem
                      key={-1}
                      disabled={true}
                      style={{height:25, padding: 8}}
                      primaryText={
                        <span style={{display:'flex', justifyContent:'space-around'}}>
                          <small>Date</small>
                          <small>Amount</small>
                          <small>Update</small>
                          <small>Delete</small>
                        </span>
                      }
                    />,
                    ...val.comps.map(renderCompedRows.bind(null, {openModal, index:i, season}))
                  ] : []
                }                
              />
            </List>
          </Card>
          )
        )
      }
    </div>
  )
}
    
export default PaymentList;

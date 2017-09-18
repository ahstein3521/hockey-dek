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

function $format(num, withSymbol = true) {
  const formattedVal = (num/100).toFixed(2);

  if (withSymbol) {
    return '  $' + formattedVal;
  } 
  return formattedVal;
}

const renderPaymentRows = ({openModal, index}, val, i) => {
 
  return (
    <ListItem
      key={i}
      primaryTogglesNestedList={true}
      primaryText={
        <span style={{display:'flex', justifyContent:'space-around'}}>
          <p>{val.date}</p>
          <p>{$format(val.amount)}</p>
          <p>{val.type}</p>
          <IconButton onTouchTap={() => openModal('EditPayment', {val, index, i} )}>
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
const renderCompedRows = ({openModal,index}, val, i) => {

  return (
    <ListItem
      key={i}
      primaryText={
        <span style={{display:'flex', justifyContent:'space-around'}}>
          <p>{val.date}</p>
          <p>{$format(val.amount)}</p>
          <IconButton onTouchTap={() => openModal('EditComp', {val, index, i })}>
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

	let { payments = [], openModal } = props;

  if (!payments) return <noScript/>
  
	return (
  	<div style={{width:'90%', margin:'0 auto 20px', padding:10}}>	
  		{
  			payments.map((val, i) => (
          <Card season={val.season} key={i}>
            <List>
              <ListItem
                primaryText='Paid: '
                secondaryText={$format(val.totalPaid, true)}
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
                    ...val.payments.map(renderPaymentRows.bind(null, { openModal, index:i}))
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
                    ...val.comps.map(renderCompedRows.bind(null, {openModal, index:i}))
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


    // <List>
    //   {
    //     comps.map((p,i) => (
    //       <ListItem
    //         key={i}
    //           primaryText={
    //             <span style={{display:'flex'}}>
    //             <p>
    //               <b> Date: </b>
    //               {' '+p.date+' |  '}
    //             </p>
    //             <p style={{marginLeft:5}}>
    //               <b> {' Amount:'}</b>
    //               {' $'+(p.amount/100).toFixed(2)}
    //             </p>              
    //             </span>
              
    //           }
    //           secondaryText={
    //             <p>
    //               <b>Reason: </b> {p.reason}
    //             </p>
    //           }
    //       />
    //     ))
    //   }       
    //   </List>
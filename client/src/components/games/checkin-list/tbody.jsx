import React from 'react';
import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';
import filterProps from '../../utils/filterTableProps';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SignInBox from './checkbox.jsx';
import Checkbox from 'material-ui/Checkbox';
import { palette } from '../../../../theme';

const { primary1Color, alternateTextColor } = palette;
const format = n => '$' + (n/100).toFixed(2);

const btnStyles = {
  style:{width:40, height:40}, 
  iconStyle: {width:20, height:20}
}



const PlayerListTable = props => {
  const { 
    checkIns,
    handleCheckIn,
    removePlayerFromGame,
    checkWaiverAtGame,   
    openModal, 
    ...player 
  } = filterProps(props);
 
  const { _id, payments = [], comps = [], season, totals = {}, waiver} = player;
  const initialValues = {season, _id };
  const waiverArgs = { playerId: _id, waiver, year: season.year };

  return (
    <TableRow key={_id} selectable={false}>
      <TableRowColumn colSpan={1}>
        <SignInBox 
          disabled={!waiver || waiver.length === 0 || player.suspended}
          onCheck={handleCheckIn}
          playerId={_id} 
        />
      </TableRowColumn>
      <TableRowColumn colSpan={2}>
        {player.fullName}
      </TableRowColumn>
      <TableRowColumn>
        {player.jerseyNumber}
      </TableRowColumn>
      <TableRowColumn>
        <Checkbox
          checked={ waiver && waiver.length === 1}
          disabled={ waiver && waiver.format === 'online'}
          onCheck={(evt, flag) => checkWaiverAtGame(waiverArgs, evt, flag)}
          
        />
      </TableRowColumn>
      <TableRowColumn style={{overflow:'none'}}>
        <span style={{verticalAlign:'super'}}>
          {format(totals.paid)}
        </span>
        <IconMenu
          menuStyle={{background:primary1Color, opacity:0.9}}
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem 
            style={{color:alternateTextColor}} 
            onTouchTap={()=> {
              openModal('NewPayment', { initialValues })}}
            primaryText="Add New Payment"
          />
          <MenuItem
            disabled={payments.length === 0}
            onTouchTap={()=> openModal('paymentHistory', { payments })}
            style={{color: alternateTextColor}} 
            primaryText="Show payment history"
          />
        </IconMenu>          
      </TableRowColumn>
      <TableRowColumn style={{overflow:'none'}}>
        <span style={{verticalAlign:'super'}}>
          {format(totals.comped)}
        </span>
        <IconMenu
          menuStyle={{background:primary1Color, opacity:0.9}}
          iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem 
            style={{color: alternateTextColor}} 
            onTouchTap={()=> openModal('NewCredit', { initialValues })}
            primaryText="Add New Credit"
          />
          <MenuItem
            style={{color: alternateTextColor}} 
            disabled={comps.length === 0}
            onTouchTap={()=> openModal('creditHistory', { comps })} 
            primaryText="Show history"
          />
        </IconMenu>                                 
      </TableRowColumn>      
      <TableRowColumn>
        {format(totals.total)}
      </TableRowColumn>
      <TableRowColumn>
        <IconButton
          onTouchTap={() => 
            openModal('RemovePlayer', { player, season, _id })
          }
        >
          <RemoveIcon/>
        </IconButton>
      </TableRowColumn>                                               
    </TableRow>
  )
}
           
export default PlayerListTable;

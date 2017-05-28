import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

import Checkbox from 'material-ui/svg-icons/action/done';

import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';

const $format = num => "$"+(num/100).toFixed(2);

const renderRows = ( team, onSelect ) => {
	
  return team.players.map( player => {
    
    const { jerseyNumber, _id, checkIns, firstName, lastName, amountPaid, amountComped } = player;
    
    return (
      <TableRow key={_id} >
				<TableRowColumn style={{width:150}}>
			    <b 
			     style={{cursor:"pointer"}} 
			     onClick={()=> onSelect(player)}
			    >
			     {`${firstName} ${lastName}`}
			    </b>
			  </TableRowColumn>
        <TableRowColumn> {jerseyNumber} </TableRowColumn>
        <TableRowColumn>
          <Badge badgeContent={checkIns} badgeStyle={{backgroundColor:'#FFECB3'}}/>
        </TableRowColumn>
        <TableRowColumn>{$format(amountPaid)}</TableRowColumn>
        <TableRowColumn>{$format(amountComped)}</TableRowColumn>
        <TableRowColumn>
          <FontIcon/>
        </TableRowColumn>
        <TableRowColumn>
          <Checkbox/>
        </TableRowColumn>         
      </TableRow>
    )
  })
};

export default renderRows;
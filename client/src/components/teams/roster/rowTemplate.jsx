import React from 'react';

import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import Checkbox from 'material-ui/svg-icons/action/done';

import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';



const $format = num => "$"+(num/100).toFixed(2);

const TableRows = ({ fetchPlayerDetails, ...player}) => { 
  const url = { pathname: '/players/profile', state: { title: player.fullName }}    
  return(
    <TableRow>
      <TableRowColumn colSpan={2}>
        <span onClick={()=> fetchPlayerDetails(player)}>
          <Link to={url} >
            {player.fullName}
          </Link>
        </span>
      </TableRowColumn>
      <TableRowColumn> {player.jerseyNumber} </TableRowColumn>
      <TableRowColumn> {player.checkIns} </TableRowColumn>
      <TableRowColumn>{$format(player.amountPaid)}</TableRowColumn>
      <TableRowColumn>{$format(player.amountComped)}</TableRowColumn>
      <TableRowColumn> <FontIcon/> </TableRowColumn>
      <TableRowColumn> <Checkbox/> </TableRowColumn>         
    </TableRow>
  )    
}

export default TableRows;
import React from 'react';

import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import Checkbox from 'material-ui/svg-icons/action/done';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';

import { Link } from 'react-router-dom';

import filterProps from '../../utils/filterTableProps';

const $format = num => "$"+(num/100).toFixed(2);

const TableRows = (props) => { 
  
  const { fetchPlayerDetails, ...rest } = filterProps(props);
  const { checkins, player } = rest;   
  const url = { pathname: '/players/profile', state: { title: player.fullName }}; 
  
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
      <TableRowColumn> {checkins} </TableRowColumn>
      <TableRowColumn>{$format(player.amountPaid)}</TableRowColumn>
      <TableRowColumn>{$format(player.amountComped)}</TableRowColumn>
      <TableRowColumn>
        {player.suspended && <Checkbox/> }
      </TableRowColumn>
      <TableRowColumn> <Checkbox/> </TableRowColumn>         
    </TableRow>
  )    
}

export default TableRows;
import React from 'react';

import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import Checkbox from 'material-ui/svg-icons/action/done';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';

import { Link } from 'react-router-dom';

import filterProps from '../../utils/filterTableProps';

const $format = num => "$"+(num/100).toFixed(2);

const TableRows = (props) => { 
  
  const { selectPlayer, ...player } = filterProps(props);
    
  const url = { pathname: '/players/profile', state: { title: player.firstName + ' ' +player.lastName }}; 
  
  return(
    <TableRow>
      <TableRowColumn colSpan={2}>
        <span onClick={()=> selectPlayer(player)}>
          <Link to={url} >
            {player.firstName + ' ' + player.lastName}
          </Link>
        </span>
      </TableRowColumn>
      <TableRowColumn> {player.jerseyNumber} </TableRowColumn>
      <TableRowColumn> {player.games || 0 } </TableRowColumn>
      <TableRowColumn>{$format(player.paid)}</TableRowColumn>
      <TableRowColumn>{$format(player.comped)}</TableRowColumn>
      <TableRowColumn>
        {player.suspended && <Checkbox/> }
      </TableRowColumn>
      <TableRowColumn> 
        { player.waiver && <Checkbox/> }
      </TableRowColumn>         
    </TableRow>
  )    
}

export default TableRows;
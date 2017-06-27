import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import { fetchPlayerDetails } from '../../../actions/index';
import { sortRows } from '../../../selectors/table';


import ProfileIcon from 'material-ui/svg-icons/social/person';


import { Link } from 'react-router-dom';

import filterProps from '../../utils/filterTableProps';

const PlayerListTable = props => {
 
  const { fetchPlayerDetails, ...player } = filterProps(props);
  
  return (
    <TableRow>
      <TableRowColumn>
        {player.lastName}
      </TableRowColumn>
      <TableRowColumn>
        {player.firstName}
      </TableRowColumn>
      <TableRowColumn>
        {player.email}
      </TableRowColumn>
      <TableRowColumn>
        {player.phone}
      </TableRowColumn>               
      <TableRowColumn>
        <span onClick={()=> fetchPlayerDetails(player)}>
          <Link to={
            {
              pathname:'/players/profile',
              state: {title:`${player.firstName} ${player.lastName}`}
            }
          }>
            <ProfileIcon/>
          </Link>
        </span>
      </TableRowColumn>                       
    </TableRow>
  )
}
           
export default PlayerListTable;


import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

import IconButton from 'material-ui/IconButton';
import ReturnIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';


import { Link } from 'react-router-dom';

import filterTableProps from '../../utils/filterTableProps';

const RowTemplate = props => {

  const { submitTeamSearch, openModal, ...team} = props;

  return (
    <TableRow key={team._id}>
    <TableRowColumn colSpan={2}>
      <b 
        style={{cursor:'pointer'}}
        onClick={()=> submitTeamSearch(team)}
      >
        <Link to={
          {
            pathname:'/teams/roster', 
            state: {title:team.name, subtitle: team.currentSeason.formatted}}}
        >
          {team.name}
        </Link>  
        </b>
      </TableRowColumn>
      <TableRowColumn>
        {team.hockeyType}
      </TableRowColumn>
      <TableRowColumn>
        {team.currentSeason.formatted}
      </TableRowColumn>
      <TableRowColumn>
        <span onClick={() => submitTeamSearch(team)}>
          <Link to={
          {
            pathname:'/teams/settings', 
            state: {title:team.name, subtitle: 'Settings'}}}
          >
            <EditIcon/>
          </Link>
        </span>
      </TableRowColumn>               
      <TableRowColumn>
        <IconButton
          onTouchTap={() => openModal('deleteTeam', team)}
        >
          <DeleteIcon/>
        </IconButton>
      </TableRowColumn>                       
    </TableRow>
  )
}


export default RowTemplate;


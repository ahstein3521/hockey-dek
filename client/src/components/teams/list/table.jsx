import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import TableHeaderColumns from './thead.jsx';


import IconButton from 'material-ui/IconButton';
import ReturnIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';


import { Link } from 'react-router-dom';



const TeamTableList = props => (
  <div style={{marginBottom:30}}> 
    <Table>
      <TableHeader 
        adjustForCheckbox={false}
        displaySelectAll={false}
      >
        <TableHeaderColumns {...props} />
      </TableHeader>      
      <TableBody
        prescanRows={false}
        showRowHover={true}
        displayRowCheckbox={false}
      >
        {
          props.teams.map( team => (
            <TableRow key={team._id}>
              <TableRowColumn>
                <b 
                  style={{cursor:'pointer'}}
                  onClick={()=> props.onSelect(team, '/teams/roster')}
                >
                {team.name}
                </b>
              </TableRowColumn>
              <TableRowColumn>
                {team.hockeyType}
              </TableRowColumn>
              <TableRowColumn>
                {team.currentSeason.quarter+ ' '+team.currentSeason.year}
              </TableRowColumn>
              <TableRowColumn>
                <IconButton
                  onTouchTap={() => props.onSelect(team, '/teams/settings')}
                >
                  <EditIcon/>
                </IconButton>
              </TableRowColumn>               
              <TableRowColumn>
                <IconButton
                  onTouchTap={() => props.openModal('deleteTeam', team)}
                >
                  <DeleteIcon/>
                </IconButton>
              </TableRowColumn>                       
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </div>
);

export default TeamTableList;
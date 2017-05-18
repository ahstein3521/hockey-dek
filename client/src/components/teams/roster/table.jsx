import React from 'react';
import {Table, TableBody, TableRow, TableHeader,TableRowColumn, TableFooter} from 'material-ui/Table';
import TableHeaderColumns from './thead.jsx';
import Checkbox from 'material-ui/svg-icons/action/done';
import {random} from 'lodash';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';

const TeamRoster = ({selected:{team}, onSelect, onSort}) => (
  <div style={{marginBottom:20}}>
    <Table style={{background:'#fafafa'}}>    
      <TableHeader style={{background:'#ff9e40'}}>
        <TableHeaderColumns onClick={onSort}/>
      </TableHeader>
      <TableBody 
        showRowHover={true}
        displayRowCheckbox={false}
      >
      {
        team.players.map(player => {
          const {firstName, lastName,jerseyNumber, _id, checkIns } = player;
          const fullName = `${firstName} ${lastName}`;  
            return (
            <TableRow key={_id} >
              <TableRowColumn style={{width:150}}>
                <b style={{cursor:"pointer"}} onClick={()=> onSelect(player)}>{fullName}</b>
              </TableRowColumn>
              <TableRowColumn>{jerseyNumber}</TableRowColumn>
              <TableRowColumn>
                <Chip>{checkIns}</Chip>
              </TableRowColumn>
              <TableRowColumn>$0.00</TableRowColumn>
              <TableRowColumn>$0.00</TableRowColumn>
              <TableRowColumn>
                <FontIcon/>
              </TableRowColumn>
              <TableRowColumn>
                <Checkbox/>
              </TableRowColumn>         
            </TableRow>
          )
        })
        } 
      </TableBody>
        <TableFooter>       
        <TableRow style={{background:'#ff6d00', verticalAlign:'middle'}}>
          <TableRowColumn/>
          <TableRowColumn/>
          <TableRowColumn><b>Totals:</b></TableRowColumn>
          <TableRowColumn>$0.00</TableRowColumn>
          <TableRowColumn>$0.00</TableRowColumn>
          <TableRowColumn/>
          <TableRowColumn/>  
      </TableRow>     
      </TableFooter> 
    </Table>
  </div>
);

export default TeamRoster
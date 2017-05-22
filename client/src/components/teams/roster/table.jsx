import React from 'react';
import { Table, TableBody, TableHeader, TableFooter } from 'material-ui/Table';

import ColumnTotals from './tfooter.jsx';
import renderBody from './tbody.jsx';
import TableHeaderColumns from './thead.jsx';




const TeamRoster = ({selected:{team}, onSelect, onSort, ...props}) => (
  <div style={{marginBottom:20}}>
    <Table style={{background:'#fafafa'}}>    
      <TableHeader style={{background:'#ff9e40'}}>
        <TableHeaderColumns {...props} onClick={onSort}/>
      </TableHeader>
      <TableBody 
        prescanRows={false}
        showRowHover={true}
        displayRowCheckbox={false}
      >
        { renderBody(team, onSelect) }
      </TableBody>
      <TableFooter>       
        <ColumnTotals {...team}/>
      </TableFooter> 
    </Table>
  </div>
);

export default TeamRoster
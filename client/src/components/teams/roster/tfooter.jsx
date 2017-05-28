import React from 'react';
import {TableRow, TableRowColumn } from 'material-ui/Table';

import { rosterTableStyle as style } from '../../../styles/index';
const TableFooter = ({totalComped, totalPaid}) => (
	<TableRow style={style.tableFooter}>
    <TableRowColumn style={{width:150}}/>
    <TableRowColumn/>
    
    <TableRowColumn> 
    	<b>Totals:</b>
    </TableRowColumn>
    
    <TableRowColumn>
    	{"$"+(totalPaid/100).toFixed(2)}
    </TableRowColumn>
    
    <TableRowColumn>
    	{"$"+(totalComped/100).toFixed(2)}
    </TableRowColumn>
    
    <TableRowColumn/>
    <TableRowColumn/>  
  </TableRow> 
);

export default TableFooter;

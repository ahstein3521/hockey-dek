import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import { TableFooter, TableRow, TableRowColumn } from 'material-ui/Table';

import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';
import ForwardIcon from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';

import { primary3Color } from '../../../theme';

const CustomTableFooter = props =>{
  const { numOfCols, rowsPerPage, currentPage, total } = props;

  const rangeStart = (currentPage * rowsPerPage) - (rowsPerPage - 1);
  let rangeEnd = rangeStart + rowsPerPage - 1 ;
  const colWidth = numOfCols/3;
  
  if (rangeEnd > total) rangeEnd = total;

  return (
      <TableRow style={{backgroundColor: primary3Color}}>
        <TableRowColumn colSpan={colWidth} style={{textAlign:'right'}}>
          <IconButton
            disabled={ currentPage === 1 }
            onTouchTap={() => props.onSelect(-1)}
          >
            <BackIcon/>
          </IconButton>
        </TableRowColumn>    
        <TableRowColumn colSpan={colWidth} style={{textAlign:'center'}}>
          <strong>
            {`Results ${rangeStart} - ${rangeEnd}  of  ${total}`}
          </strong>
        </TableRowColumn>
        <TableRowColumn colSpan={colWidth} style={{textAlign:'left'}}>
          <IconButton
            disabled={rangeEnd >= total}
            onTouchTap={() => props.onSelect(1)}
          >            
            <ForwardIcon/>
          </IconButton>        
        </TableRowColumn>
      </TableRow>
   
  );
}

export default CustomTableFooter;


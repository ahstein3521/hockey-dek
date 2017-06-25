import React from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
import { TableFooter, TableRow, TableRowColumn } from 'material-ui/Table';

import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';
import ForwardIcon from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';

import { get } from 'lodash';

import { primary3Color } from '../../../theme';

const CustomTableFooter = props =>{
  const { numOfCols, rowsPerPage, currentPage, totalRows } = props;

  const rangeStart = (currentPage * rowsPerPage) - (rowsPerPage - 1);
  let rangeEnd = rangeStart + rowsPerPage - 1 ;
  const colWidth = numOfCols/3;


  if (rangeEnd > totalRows) rangeEnd = totalRows;
 
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
            {`Results ${rangeStart} - ${rangeEnd}  of  ${totalRows}`}
          </strong>
        </TableRowColumn>
        <TableRowColumn colSpan={colWidth} style={{textAlign:'left'}}>
          <IconButton
            disabled={rangeEnd >= totalRows}
            onTouchTap={() => props.onSelect(1)}
          >            
            <ForwardIcon/>
          </IconButton>        
        </TableRowColumn>
      </TableRow>
   
  );
}

function mapStateToProps(state, ownProps) {
  const rows = get(state, ownProps.rowPathname, []);

  return { totalRows: rows.length }
}

export default connect(mapStateToProps)(CustomTableFooter);


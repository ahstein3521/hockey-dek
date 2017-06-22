import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import Checkbox from 'material-ui/svg-icons/action/done';

import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { fetchPlayerDetails } from '../../../actions/index';
import { sortRows } from '../../../selectors/table';

const $format = num => "$"+(num/100).toFixed(2);

class TableRows extends Component{
  static muiName = 'TableBody';

  renderRow = player => {    
    const { jerseyNumber, _id, checkIns, firstName, lastName, amountPaid, amountComped } = player;
    const { fetchPlayerDetails } = this.props;
    const url = { pathname: '/players/profile', state: {title: `${firstName} ${lastName}`}}
    
    return(
      <TableRow key={_id} >
        <TableRowColumn colSpan={2}>
          <span onClick={()=> fetchPlayerDetails(player)}>
            <Link to={url} >
              {`${firstName} ${lastName}`}
            </Link>
          </span>
        </TableRowColumn>
        <TableRowColumn> {jerseyNumber} </TableRowColumn>
        <TableRowColumn> {checkIns} </TableRowColumn>
        <TableRowColumn>{$format(amountPaid)}</TableRowColumn>
        <TableRowColumn>{$format(amountComped)}</TableRowColumn>
        <TableRowColumn> <FontIcon/> </TableRowColumn>
        <TableRowColumn> <Checkbox/> </TableRowColumn>         
      </TableRow>
    )    
  }

  render(){
    const { rows } = this.props;
      
    return (
      <TableBody
        prescanRows={false}
        showRowHover={true}
        displayRowCheckbox={false}
      >
        { rows.map( this.renderRow ) }
      </TableBody>
  )
  }
};

function mapStateToProps( state, ownProps){
  const formatRows = sortRows();
  const rows = ownProps.rows; 
  return { rows: formatRows({ rows }, ownProps) }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlayerDetails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
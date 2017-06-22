import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import { fetchPlayerDetails } from '../../../actions/index';
import { sortRows } from '../../../selectors/table';


import ProfileIcon from 'material-ui/svg-icons/social/person';


import { Link } from 'react-router-dom';


class PlayerListTable extends Component{
  static muiName = 'TableBody';

  render(){
    return (
      <TableBody
        preScanRows={false}
        showRowHover={true}
        displayRowCheckbox={false}
      >
        {
          this.props.rows.map( player => (
            <TableRow key={player._id}>
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
                <span onClick={()=> this.props.fetchPlayerDetails(player)}>
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
          ))
        }
      </TableBody>
    );      
  }
}     


function mapStateToProps( state, ownProps){
  const formatRows = sortRows();
  const rows = ownProps.rows; 
  return { rows: formatRows({ rows }, ownProps) }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlayerDetails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerListTable)


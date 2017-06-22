import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableRow, TableRowColumn, TableBody } from 'material-ui/Table';

import { openModal, submitTeamSearch } from '../../../actions/index';
import { sortRows } from '../../../selectors/table';

import IconButton from 'material-ui/IconButton';
import ReturnIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';


import { Link } from 'react-router-dom';


class TeamTableList extends Component{
  static muiName = 'TableBody';

  render(){
    return (
      <TableBody
        preScanRows={false}
        showRowHover={true}
        displayRowCheckbox={false}
      >
        {
          this.props.rows.map( team => (
            <TableRow key={team._id}>
              <TableRowColumn colSpan={2}>
                <b 
                  style={{cursor:'pointer'}}
                  onClick={()=> this.props.submitTeamSearch(team)}
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
                <span onClick={() => this.props.submitTeamSearch(team)}>
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
                  onTouchTap={() => this.props.openModal('deleteTeam', team)}
                >
                  <DeleteIcon/>
                </IconButton>
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
  return bindActionCreators({ openModal, submitTeamSearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamTableList)


import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { openModal, submitTeamSearch, getTeamSettings } from '../../../actions/index';

import Table from './table.jsx';
import Paper from 'material-ui/Paper';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ReturnIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { orderBy } from 'lodash';

const SortRows = ( list, state ) => {
	
	const { sortCategory, direction } = state;
	
	return orderBy(list, sortCategory, direction);

}

class TeamList extends Component{
	
	state = {
		sortCategory: 'name',
		direction: 'asc'
	}

	onSort = columnClicked => {
		const { sortCategory, direction } = this.state;
		let newCategory = columnClicked;
		let newDirection = 'asc';

		if(!columnClicked) return;

		if(columnClicked === sortCategory ){
			newDirection = direction === 'asc' ? 'desc' : 'asc';
		}
		this.setState({ 
			direction: newDirection,
			sortCategory: newCategory
		}); 
	}
	
	onSelect = (team, route) => {
		const { name, currentSeason } = team;
		const subtitle = /settings$/.test(route) ? 'Settings' : currentSeason.formatted;
		this.props.submitTeamSearch(team);
		this.props.history.push(route, { title: name, subtitle });
	}

	render(){
		const { teams, openModal } = this.props;

		return (
			<Table 
				onSort={this.onSort}
				sortProps={this.state}
				onSelect={this.onSelect}
				openModal={openModal}
				teams={SortRows(teams, this.state)}
			/>
		)
  }
}

function mapStateToProps({ teams }){
	
	return { teams: teams.list };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ openModal, submitTeamSearch }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps )(TeamList)

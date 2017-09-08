import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCheckIn, addPlayerToGame } from '../../../actions/index';
import { ListOne, ListTwo } from './teamTable.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Route } from 'react-router-dom';
import AutoComplete from './addPlayer.jsx';
import axios from 'axios';

class TeamLists extends Component {

	state = { 
		selectedTab: 1, 
		availablePlayers: [], 
		searchText: '' 
	}
	
	componentWillMount() {
		let { availablePlayers } = this.props;
		let arr = [];

		availablePlayers.forEach(player => {
			let { firstName, lastName, _id } = player;
			let fullName = lastName + ', ' + firstName;

			arr.push({ _id, fullName })

		})
		this.setState({ availablePlayers: arr });
	}
	addPlayer = player => {
		const { selectedTab } = this.state;
		const { location: { state: { quarter, year }}, team1, team2 } = this.props;
		const team = selectedTab === 1? team1 : team2;
		const otherTeam = selectedTab === 1? team2 : team1;
		const { _id, teamNumber } = team;
		
		const season = { quarter, year, _id, otherTeam };
		
		this.props.addPlayerToGame(player._id, season, teamNumber);
		

		this.setState({ searchText: '' });
	}
	updateInput = searchText => 
		this.setState({ searchText })
	
	handleChange = n => 
		this.setState({ selectedTab: n, searchText: '' })


	render() { 
		const { isLoading, team1, team2 } = this.props;
		const { selectedTab, availablePlayers } = this.state;
		
		return (
			<Tabs 
				onChange={this.handleChange}
				value={selectedTab}
			>
				<Tab label={team1.name} value={1}>
					<span>
					{
						selectedTab === 1 && 
							<span>
							<AutoComplete 
								team={team1}
								addPlayer={this.addPlayer}
								updateInput={this.updateInput} 
								{...this.props} 
								{...this.state}
								/>
								<ListOne/>
							</span>	
					}
					</span>
				</Tab>
				<Tab label={team2.name} value={2}>
					<span>				
					{
						selectedTab === 2 && 
							<span>
								<AutoComplete 
									addPlayer={this.addPlayer}
									team={team2}
									updateInput={this.updateInput} 
									{...this.props} 
									{...this.state}
									/>
								<ListTwo/>
							</span>
					}
					</span>
				</Tab>
			</Tabs>
		)
	}
}	

function mapStateToProps(state) {
	const { team1, team2 } = state.game;

	return {
		availablePlayers: state.player.list,
		isLoading: state.loading,
		team1,
		team2
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addPlayerToGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamLists);
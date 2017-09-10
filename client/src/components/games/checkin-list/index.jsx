import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GameForm from '../new-game-form/page1.jsx';
import { addPlayerToGame, selectGameTab, fetchRosters } from '../../../actions/index';
import { ListOne, ListTwo } from './teamTable.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Route } from 'react-router-dom';
import AutoComplete from './addPlayer.jsx';
import axios from 'axios';

class TeamLists extends Component {

	state = { 
		availablePlayers: [], 
		searchText: '' 
	}
	
	componentWillMount() {
		let { availablePlayers, fetchRosters } = this.props;
		let arr = [];

		availablePlayers.forEach(player => {
			let { firstName, lastName, _id } = player;
			let fullName = lastName + ', ' + firstName;

			arr.push({ _id, fullName })

		})

		this.setState({ availablePlayers: arr });
	}
	addPlayer = player => {
		
		const { selectedTab, quarter, year, team1, team2 } = this.props;
		
		const { _id } = this.props[`team${selectedTab}`];
		const season = { quarter, year, _id };
		const teams = [team1._id, team2._id];

		this.props.addPlayerToGame(player._id, season, teams);
		

		this.setState({ searchText: '' });
	}
	updateInput = searchText => 
		this.setState({ searchText })
	
	handleChange = n => {
		this.props.selectGameTab(n);
		this.setState({ searchText: '' })
	}

	render() { 
		const { selectedTab, isLoading, team1, team2, gameId, history, location, match } = this.props;
		const routerProps = { history, location, match };
		const { availablePlayers } = this.state;
		
		if (!gameId) return <GameForm {...routerProps} />;

		return (
			<Tabs 
				onChange={this.handleChange}
				value={selectedTab}
			>
				<Tab label={team1.team.name} value={1}>
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
				<Tab label={team2.team.name} value={2}>
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
	// const { team1, team2, gameId, quarter, year, selectedTab } = state.game;

	return {
		availablePlayers: state.player.list,
		isLoading: state.loading,
		...state.game
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addPlayerToGame, selectGameTab, fetchRosters }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamLists);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPlayerToGame, selectGameTab, fetchRosters, startNewGame, deleteGame } from '../../../actions/index';
import buildTable from './teamTable.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Redirect } from 'react-router-dom';
import AutoComplete from './addPlayer.jsx';
import Toolbar from './toolbar.jsx';
import CircularProgress from 'material-ui/CircularProgress';

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

	renderTable = (tab, team) => {
		const { selectedTab } = this.props;
		
		if (selectedTab !== tab) {
			return <span />;
		} else {
			let Table = buildTable(tab);

			return (
				<span>
					<AutoComplete 
						team={team}
						addPlayer={this.addPlayer}
						updateInput={this.updateInput} 
						{...this.props} 
						{...this.state}
					/>
					<Table/>
				</span>	

			);
		}
	}

	render() { 
		const { team1, team2, gameId } = this.props;
		
		if (this.props.isLoading) return <CircularProgress />;
		
		if (!gameId) return <Redirect to='games/new/1'/>
		
		return (
			<span>
				<Toolbar 
					title={this.props.gameDate} 
					deleteGame={deleteGame.bind(null, gameId)} 
					reset={this.props.reset}
				/>
				<Tabs 
					onChange={this.handleChange}
					value={this.props.selectedTab}
				>
					<Tab label={team1.team.name} value={1}>
						{ this.renderTable(1, team1)}
					</Tab>
					<Tab label={team2.team.name} value={2}>
						{ this.renderTable(2, team2) }
					</Tab>
				</Tabs>
			</span>
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
	return bindActionCreators({ 
		reset: startNewGame,
		deleteGame,
		addPlayerToGame, 
		selectGameTab, 
		fetchRosters 
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamLists);
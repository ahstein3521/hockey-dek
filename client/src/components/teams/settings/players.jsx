import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import RaisedButton from 'material-ui/RaisedButton';

import { primary3Color, accent2Color } from '../../../../theme';

import AutoComplete from './roster/autocomplete.jsx';
import PlayerCategory from './roster/section.jsx';

import { getPlayerConfig } from '../../../selectors/updateTeam';

const PlayersList = props => {
		const { players, addPlayer, removePlayer, undoRemovePlayer, currentSeason } = props;
		// console.log(players, 'component');
		return(
			<div style={{width:'80%',padding:15, margin:'30px auto 40px'}}>
				<PlayerCategory 
					title="Current Roster"
					backgroundColor={primary3Color}
					onRequestDelete={removePlayer}
					list={players.current}
				/>
				<PlayerCategory
					title="Added To Roster"
					backgroundColor={accent2Color}
					onRequestDelete={removePlayer}
					list={players.added}
				/>				
				<PlayerCategory
					title="Removed From Roster"
					backgroundColor="#f00001"
					onRequestDelete={undoRemovePlayer}
					list={players.removed}
				/>

				
					<AutoComplete
						searchText = {props.searchText}
						handleNewRequest = {addPlayer}
						available = {players.available}					
						handleUpdateInput = {props.updateInput}
					/>
					<div className="btn-group">
						<RaisedButton 
							label="Update"
							className="form-btn"
							onTouchTap={() => props.handleSubmit(players, currentSeason)}
							primary={true}
						/>						
						<RaisedButton
							secondary={true}
							className="form-btn"
							onTouchTap={props.handleReset}
							label="Reset"
						/>
				</div>
			</div>
		)
	}


function mapStateToProps(state, {searchText,...ownProps}) {
	const playerConfig = getPlayerConfig();

	return { 
		currentSeason: state.teams.selected.team.currentSeason._id,
		players: playerConfig(state, ownProps) 
	};
}

export default connect(mapStateToProps)(PlayersList);


	// state = { 
	// 	current: [...this.props.players],
	// 	available: [...this.props.availablePlayers],
	// 	removed: [],
	// 	added: [], 
	// 	searchText: ''
	// };

	// //Delete permanently if not a current team member, else store in an array in case user wants to undo
	// handleDelete = (player, index) => {
	// 	const { current, removed, added, available } = this.state;

	// 	if(player.index){ 
	// 	/* 
	// 		ie - this player was not a part of the original lineup,
	// 		becaue an index property was added to the player object when
	// 		formatting the AutoComplete component 
	// 	*/
	// 		added.splice(index, 1);
	// 		available.push(player);
	// 	}
	// 	else{
	// 		current.splice(index, 1);
	// 		//save index property to object to be used for 'Restore' function
	// 		removed.push({...player, index});
	// 	}
	// 	this.setState({ current, removed, added, available });
	// };

	// handleNewRequest = ({playerData}) => {
	// 	const { available, added } = this.state;
		
	// 	if (!playerData) return;

	// 	added.push(playerData);
	// 	available.splice(playerData.index, 1);

	// 	this.setState({ added, available, searchText: ''});
	// };

	// handleRestore = ({ index, ...player }, removedIndex) => {
	// 	const { current, removed } = this.state;

	// 	const head = current.slice(0, index);
	// 	const tail = current.slice(index);
	// 	const restoredArray = [ ...head, player, ...tail ];

	// 	removed.splice(removedIndex, 1);

	// 	this.setState({ current: restoredArray, removed });
	// };

	// handleReset = () => {

	// 	this.setState({
	// 		available: [...this.props.availablePlayers],
	// 			current: [...this.props.players],
	// 				added: [],
	// 			removed: []
	// 	});
	// };

	
	// handleSubmit = () => {
	// 	const { removed , added } = this.state;

	// 	this.props.updateTeamPlayers({added, removed});
	// }

	// componentWillReceiveProps = nextProps => {
	// 	if (nextProps.players != this.props.players) {
	// 		this.setState({
	// 			available: [...nextProps.availablePlayers],
	// 			current: [...nextProps.players],
	// 			added: [],
	// 			removed: []
	// 		})
	// 	}	
	// }
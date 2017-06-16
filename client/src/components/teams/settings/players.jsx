import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import { primary3Color, accent2Color } from '../../../../theme';

import AutoComplete from './roster/autocomplete.jsx';
import PlayerCategory from './roster/section.jsx';

class PlayersList extends Component{
	
	state = { 
		current: [...this.props.players],
		available: [...this.props.availablePlayers],
		removed: [],
		added: [], 
		searchText: ''
	};

	//Delete permanently if not a current team member, else store in an array in case user wants to undo
	handleDelete = (player, index) => {
		const { current, removed, added, available } = this.state;

		if(player.index){ 
		/* 
			ie - this player was not a part of the original lineup,
			becaue an index property was added to the player object when
			formatting the AutoComplete component 
		*/
			added.splice(index, 1);
			available.push(player);
		}
		else{
			current.splice(index, 1);
			//save index property to object to be used for 'Restore' function
			removed.push({...player, index});
		}
		this.setState({ current, removed, added, available });
	};

	handleNewRequest = ({playerData}) => {
		const { available, added } = this.state;
		
		if (!playerData) return;

		added.push(playerData);
		available.splice(playerData.index, 1);

		this.setState({ added, available, searchText: ''});
	};

	handleRestore = ({ index, ...player }, removedIndex) => {
		const { current, removed } = this.state;

		const head = current.slice(0, index);
		const tail = current.slice(index);
		const restoredArray = [ ...head, player, ...tail ];

		removed.splice(removedIndex, 1);

		this.setState({ current: restoredArray, removed });
	};

	handleReset = () => {

		this.setState({
			available: [...this.props.availablePlayers],
				current: [...this.props.players],
					added: [],
				removed: []
		});
	};

	
	handleSubmit = () => {
		const { removed , added } = this.state;

		this.props.updateTeamPlayers({added, removed});
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.players != this.props.players) {
			this.setState({
				available: [...nextProps.availablePlayers],
				current: [...nextProps.players],
				added: [],
				removed: []
			})
		}	
	}
	render(){
		
		return(
			<div style={{width:'80%',padding:15, margin:'30px auto 40px'}}>
				<PlayerCategory 
					title="Current Roster"
					backgroundColor={primary3Color}
					onRequestDelete={this.handleDelete}
					list={this.state.current}
				/>
				<PlayerCategory
					title="Added To Roster"
					backgroundColor={accent2Color}
					onRequestDelete={this.handleDelete}
					list={this.state.added}
				/>				
				<PlayerCategory
					title="Removed From Roster"
					backgroundColor="#f00001"
					onRequestDelete={this.handleRestore}
					list={this.state.removed}
				/>

				
					<AutoComplete
						searchText = {this.state.searchText}
						handleNewRequest = {this.handleNewRequest}
						available = {this.state.available}					
						handleUpdateInput = {searchText => this.setState({ searchText })}
					/>
					<div style={{position:'absolute', right:10, bottom:10}}>
						<RaisedButton 
							style={{marginRight:10}}
							label="Update"
							onTouchTap={this.handleSubmit}
							primary={true}
						/>						
						<RaisedButton
							secondary={true}
							onTouchTap={this.handleReset}
							label="Reset"
							style={{marginRight:15}}
						/>
				</div>
			</div>
		)
	}
}

export default PlayersList;
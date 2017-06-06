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
			available.push({...player, index: available.length});
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

		this.setState({ added, available});
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

	handleSubmit = (data) => {

	};

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
						handleNewRequest = {this.handleNewRequest}
						available = {this.state.available}
					/>
					<div style={{position:'absolute', right:10, bottom:10}}>
						<RaisedButton
							secondary={true}
							onTouchTap={this.handleReset}
							label="Reset"
							style={{marginRight:15}}
						/>
						<RaisedButton 
							label="Update"
							primary={true}
						/>
				</div>
				<span style={{clear:'both'}}></span>
			</div>
		)
	}
}

export default PlayersList;
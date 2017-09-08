import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { updateRoster } from '../../../actions/index'; 
import RaisedButton from 'material-ui/RaisedButton';
import { primary3Color, accent2Color } from '../../../../theme';
import AutoComplete from './roster/autocomplete.jsx';
import PlayerCategory from './roster/section.jsx';


class PlayersList extends Component {
  
  state = {
  	available: [...this.props.availablePlayers],
  	added: [],
  	current: [...this.props.players],
  	removed: [],
  	searchText: ''
  }

  updateInput = searchText => 
  	this.setState({ searchText })

	addPlayer = ({playerData}) => {
		const { _id } = playerData;
		const { added, available } = this.state;

		this.setState({
			added: [...added, playerData ],
			available: available.filter(v => v._id !== _id),
			searchText: ''
		})
	}

	removePlayer = (player, section) => {
		const currState = this.state[section]; 
		const newState = currState.filter(p => p._id !== player._id);
		const { removed } = this.state;

		if (section === 'current') {
			removed.push(player);
		}

		this.setState({
			available: [...this.state.available, player],
			removed,
			[section] : newState,
		})
	}

	undoRemovePlayer = (player) => {
		let { removed, current } = this.state;

		removed = removed.filter(p => p._id !== player._id);
		current.push(player);

		this.setState({ current, removed })
	}

	handleSubmit = () => {
		const { updateRoster, currentSeason, dispatch } = this.props;
		let { added, removed } = this.state;	

		added = added.map(p => p._id);
		removed = removed.map(p => p._id);

		updateRoster(currentSeason, { added, removed });	
	}

	reset = () => {
		this.setState({
			added: [],
			available: [...this.props.availablePlayers],
			current: [...this.props.players],
			removed: [],
			searchText: ''
		})
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.players !== this.props.players) {
			this.reset();
		}
	}
	render() {	

		return(
			<div style={{width:'80%',padding:15, margin:'30px auto 40px'}}>
				<PlayerCategory 
					backgroundColor={primary3Color}
					list={this.state.current}
					onRequestDelete={this.removePlayer}
					title="Current Roster"
				/>
				<PlayerCategory
					backgroundColor={accent2Color}
					list={this.state.added}
					onRequestDelete={this.removePlayer}
					title="Added To Roster"
				/>				
				<PlayerCategory
					title="Removed From Roster"
					backgroundColor="#f00001"
					onRequestDelete={this.undoRemovePlayer}
					list={this.state.removed}
				/>

				
					<AutoComplete
						searchText={this.state.searchText}
						handleNewRequest={this.addPlayer}
						available={this.state.available}					
						handleUpdateInput={this.updateInput}
					/>
					<div className="btn-group">
						<RaisedButton 
							label="Update"
							className="form-btn"
							onTouchTap={this.handleSubmit}
							primary={true}
						/>						
						<RaisedButton
							secondary={true}
							className="form-btn"
							onTouchTap={this.reset}
							label="Reset"
						/>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { 
		team: { players, currentSeason }, 
		availablePlayers 
	} = state.teams.selected; 
	
	return { players, currentSeason, availablePlayers };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ updateRoster }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);


  
  // componentWillMount() {
  //   const { setState } = this;
  //   axios.get('/season/players')
  //     .then(players => 
  //       setState({ available: players})
  //     )
  // }

  // undoRemovePlayer = player => {
  //   let [...removed] = this.state.removed;
  //   const index = removed.indexOf(player._id);
  //   removed.splice(index, 1);

  //   this.setState({ removed })
  // }

  // removePlayer = player => {
  //   const [...added] = this.state.added;
   
  //   const addedIndex = added.indexOf(player._id);

  //   if (addedIndex !== -1) {
  //     added.splice( addedIndex, 1);
  //   }
    
    
  //   this.setState({ 
  //     added, 
  //     removed: [...this.state.removed, player._id] 
  //   });

  // }

  // handleReset = () => 
  //   this.setState({ added: [], removed: [] })


  // updatePlayers = (players, season) => {  
  //   this.props.updateTeamPlayers(season, players);
  //   this.setState({ added: [], removed: [] });
  // }


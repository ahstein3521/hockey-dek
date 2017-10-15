import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { updateTeamLineup } from '../../../actions/index';
import getPlayerList from './roster.selector';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear'


const AddPlayerAutocomplete = props => (
		<AutoComplete
			dataSource={props.players}
			filter={AutoComplete.caseInsensitiveFilter}
			floatingLabelText="Add player to roster"
			hintText="Find a player to add"
			dataSourceConfig={{text:'fullName', value:'_id'}}
			maxSearchResults={5}
			onUpdateInput={props.handleUpdateInput}
			onNewRequest={props.handleNewRequest}  
			searchText={props.searchText}
			style={{marginBottom:40}}
		/>
)


const renderList = ({fields, players, searchText, index, ...actions }) => {

	return (

		<span>
			<AddPlayerAutocomplete
				handleNewRequest={player => {
					fields.push(player);
					actions.removePlayer(player);
					actions.clearInput(index);
				}}
				handleUpdateInput={actions.updateInput}
				players={players}
				searchText={searchText}
			/>
			{	
				fields.map((player,i) => 
					<div key={i}>
					<Field
						key={i}
						className='list-input'
						component='input'
						readOnly={true}
						type='text'
						name={`${player}.fullName`}
					/>
					<IconButton 
						type='button'
						onTouchTap={()=> {
							actions.addPlayer(i, index);
							fields.remove(i);
						}}
						>
							<ClearIcon/>
						</IconButton>
					</div>
				)
			}
	</span>
)	
}

class TeamList extends Component {
	state = { 
		searchText: '', 
		availablePlayers: this.props.availablePlayers.slice()
	}
	
	updateInput = input => {		
		this.setState({ searchText: input }); 
	} 
	
	clearInput = index => {
		this.setState({input: ''})
	}

	removeAvailablePlayer = player => {
		let { availablePlayers } = this.state;
		let index = availablePlayers.findIndex(v => v._id === player._id);
		availablePlayers.splice(index, 1);
		this.props.dispatch({ 
			type: 'OPEN_SNACKBAR', 
			payload: `${player.fullName} added to roster.`
		});
		this.setState({ availablePlayers, searchText: '' });
	}

	addAvailablePlayer = index => {
		const { availablePlayers } = this.state;
		const { playerList } = this.props;

		const player = playerList[index];

		availablePlayers.push(player);
		this.props.dispatch({ 
			type: 'OPEN_SNACKBAR', 
			payload: `${player.fullName} removed from roster.`
		});
		
		this.setState({ availablePlayers });
	}
	handleReset = () => {
		const { reset, availablePlayers } = this.props;
		this.setState({ availablePlayers: availablePlayers.slice() });
		reset('ImportPlayerForm');
	}
	render() {
		const { 
			team,
			handleSubmit,
			availablePlayers,
			seasonName
		} = this.props;

		const faProps = { 
			players: this.state.availablePlayers,
			addPlayer: this.addAvailablePlayer,
			removePlayer: this.removeAvailablePlayer,
			updateInput: this.updateInput,
			clearInput: this.clearInput,
			searchText: this.state.searchText,
		};

		return (
			<form onSubmit={handleSubmit} className='form'>
				<h3>
				{
					`Select the players you wish to import to this season`
				}
				</h3>
				
					<div>
						<FieldArray name='players' component={renderList} props={faProps}/>
					</div>	
					
				<div className="btn-group">
        <RaisedButton
          type="button"
          label="Reset"
          className="form-btn"
          onTouchTap={this.handleReset}
          secondary={true}
        />          
        <RaisedButton
          type="submit"
          label="Submit"
          className="form-btn"
          primary={true}
        />
      </div>
			</form>
		)
	}
}

const selector = getPlayerList();
const formSelector = formValueSelector('ImportPlayerForm');

function mapStateToProps(state, ownProps) {
	
	return {
		...selector(state, ownProps),
		playerList: formSelector(state, 'players')
	}
}

const TeamForm = reduxForm({
	form: 'ImportPlayerForm',
	onSubmit: updateTeamLineup
})(TeamList)

export default connect(mapStateToProps)(TeamForm)
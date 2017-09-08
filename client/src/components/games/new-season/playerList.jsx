import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { getPlayerList } from './selector';
import { buildNewSeason } from '../../../actions/index';
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
				handleUpdateInput={v => actions.updateInput(v, index)}
				players={players}
				searchText={searchText[index]}
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
		searchText: ['', ''], 
		availablePlayers: this.props.availablePlayers.slice()
	}
	
	updateInput = (input, index) => {

		let { searchText } = this.state;
		searchText[index] = input;
		this.setState({ searchText }); 
	} 
	
	clearInput = index => {
		this.updateInput('', index);		
	}

	removeAvailablePlayer = player => {
		let { availablePlayers } = this.state;
		let index = availablePlayers.findIndex(v => v._id === player._id);
		availablePlayers.splice(index, 1);
		this.setState({ availablePlayers });
	}

	addAvailablePlayer = (playerIndex, listIndex) => {
		const { availablePlayers } = this.state;
		const { team1, team2 } = this.props;

		const team = listIndex === 0 ? team1 : team2;
		const player = team.players[playerIndex];
		availablePlayers.push(player);
		this.setState({ availablePlayers });
	}
	handleReset = () => {
		const { reset, availablePlayers } = this.props;
		this.setState({ availablePlayers: availablePlayers.slice() });
		reset('ImportPlayerForm');
	}
	render() {
		const { 
			team1, 
			team2, 
			handleSubmit,
			availablePlayers,
			seasonName
		} = this.props;

		const baseProps = { 
			players: this.state.availablePlayers,
			addPlayer: this.addAvailablePlayer,
			removePlayer: this.removeAvailablePlayer,
			updateInput: this.updateInput,
			clearInput: this.clearInput,
			searchText: this.state.searchText
		};
		const fieldArr1 = {...baseProps, team: team1.players, index: 0 };
		const fieldArr2 = {...baseProps, team: team2.players, index: 1 };
		

		return (
			<form onSubmit={handleSubmit} className='form'>
				<h3>
				{
					`Select the players you wish to import to the ${seasonName} season`
				}
				</h3>
				<div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
					<div style={{width:'50%'}}>
						<h4>{team1.name}</h4>
						<FieldArray name='team1.players' component={renderList} props={fieldArr1}/>
					</div>
					<div style={{width:'50%'}}>
						<h4>{team2.name}</h4>
						<FieldArray name='team2.players' component={renderList} props={fieldArr2}/>
					</div>	
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
          label="Next"
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
	let { team1 = {}, team2 = {}} = formSelector(state, 'team1', 'team2');

	return {...selector(state, ownProps), team1, team2};
}

const TeamForm = reduxForm({
	form: 'ImportPlayerForm',
	onSubmit: buildNewSeason
})(TeamList)

export default connect(mapStateToProps)(TeamForm)
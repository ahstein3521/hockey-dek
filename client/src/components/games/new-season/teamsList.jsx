import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Checkbox } from 'redux-form-material-ui';
import { getTeamList } from './selector';
import { importTeams } from '../../../actions/index';
import Toolbar from '../new-game-form/toolbar.jsx';

const TeamList = props => {
	return (
		<span>
			<Toolbar title='Import Teams'/>
			<form onSubmit={props.handleSubmit} className='form'>
				<h3>
				{
					`Check off any teams you wish to import to the ${props.seasonName} season`
				}
				</h3>
				{
					props.teams.map((team, i) => 
						<Field
							component={Checkbox}
							key={i}
							label={team.values.name}
							name={`teams[${i}].checked`}
						/>
					)
				}
				<button type='submit'>Submit</button>
		</form>
		</span>
	)
}


function mapStateToProps(state, ownProps) {
	const { game } = state;
	const { formValues } = ownProps.location.state;

	return { 
		seasonName: formValues.seasonName,
		teams: formValues.teams,
		initialValues: formValues
	}
}

const TeamForm = reduxForm({
	form: 'ImportTeamForm',
	onSubmit: importTeams
})(TeamList)

export default connect(mapStateToProps)(TeamForm)
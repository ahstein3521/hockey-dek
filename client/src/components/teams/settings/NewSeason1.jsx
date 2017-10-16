import React from 'react';

import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import { newSeasonForTeam } from '../../../actions/index';
import Dropdowns from '../../games/new-game-form/dropdowns.jsx';
import RaisedButton from 'material-ui/RaisedButton';

const UpdateTeamForm = props => {
	const { handleSubmit, initialValues, change, location } = props;
	const { seasons } = location.state;

	return (
		<form onSubmit={handleSubmit} className="form">
			<Dropdowns showNextYear={true}/>
			<div className="btn-group">
				<RaisedButton
					className="form-btn"
					secondary={true}
					onTouchTap={props.reset}
					label="Clear"
				/>
				<RaisedButton
					className="form-btn"
					label="Next"
					type="submit"
					primary={true}
				/>				
			</div>
		</form>
	)
}

function validate(values, props) {
	const { seasons } = props.location.state;
	let errors = {};
	if (!values.quarter) {
		errors.quarter = 'Select a season';
		return errors;
	}
	if (!values.year) {
		errors.year = 'Select a year';
		return errors;
	}
	let found = false
	seasons.forEach(season => {
		if (!found && season.quarter === values.quarter && season.year === values.year) {
			errors.year = errors.quarter = 'This season already exists';
			found = true;
		}
	});
	return errors;
}


export default reduxForm({
	form:'NewSeasonTeamForm',
	onSubmit: newSeasonForTeam,
	validate,
})(UpdateTeamForm);




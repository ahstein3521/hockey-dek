import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { createTeam, openSnackbar } from '../../actions/index';

import validate from '../forms/validation';

let CreateTeamForm = props => {
	const { handleSubmit, error } = props;

	return (
		<form onSubmit={handleSubmit}>
			<div style={{width:'100%',display:'flex', justifyContent:'space-around'}}>
				{error && <p>Error</p>}
				<Field 
					style={{width:'45%'}}
					component={TextField}
					name="team.name"
					floatingLabelText="Team Name"
				/>
				<Field
					component={RadioButtonGroup}
					name="team.hockeyType"
					style={{width:'20%', paddingTop:15}}
				>
					<RadioButton  label="Dek" value="Dek"/>
					<RadioButton label="Roller" value="Roller"/>
				</Field>
			</div>
			<div style={{width:'100%',display:'flex', justifyContent:'space-around'}}>
			<Field
				floatingLabelText="Season"
				component={SelectField}
				name="quarter"
				style={{width:'45%'}}
			>
				<MenuItem value={1} primaryText="Winter"/>
				<MenuItem value={2} primaryText="Spring"/>
				<MenuItem value={3} primaryText="Summer"/>
				<MenuItem value={4} primaryText="Fall"/>				
			</Field>
			<Field
				type="number"
				component={TextField}
				name="year"
				style={{width:'20%'}}
				floatingLabelText="Year"
			/>
			</div>
		</form>
	)
}

function mapStateToProps({teams:{ list } }){
  return { teamsList:list };
}

CreateTeamForm = reduxForm({
	form:'CreateTeamForm',
	onSubmit: createTeam,
	onSubmitSuccess: openSnackbar,
	validate,

})(CreateTeamForm)

export default connect(mapStateToProps)(CreateTeamForm);
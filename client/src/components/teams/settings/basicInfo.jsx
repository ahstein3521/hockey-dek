import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { createTeam, openSnackbar } from '../../../actions/index';

import PlayersList from './players.jsx';


const validate = values => {
	const errors = {};
}


const UpdateTeamForm = props => {
	const { handleSubmit, error, initialValues } = props;
	const { seasons, currentSeason, players } = initialValues;
	return (
		<form onSubmit={handleSubmit} style={{padding: 10}}>
			<h1 style={{marginTop:30, textAlign:'center'}}>
				Team Settings
			</h1>
			<div style={{width:'100%',display:'flex', justifyContent:'space-around'}}>
				<Field 
					style={{width:'45%'}}
					component={TextField}
					name="name"
					floatingLabelText="Team Name"
				/>
				<Field
					component={RadioButtonGroup}
					name="hockeyType"
					style={{width:'20%', paddingTop:15}}
				>
					<RadioButton  label="Dek" value="Dek"/>
					<RadioButton label="Roller" value="Roller"/>
				</Field>
			</div>
			<div style={{width:'100%',display:'flex', justifyContent:'space-around', marginBottom:40}}>
				<Field 
					name="currentSeason.id"
					value={currentSeason.id}
					style={{width:'45%'}}
					onChange={(a,b,c)=> console.log(c)}
					component={SelectField}
					floatingLabelText="Current Season"
				>	
					<MenuItem primaryText={currentSeason.formatted} value={currentSeason.id}/>
					{
						seasons.map((season, i) => 
							<MenuItem key={i} primaryText={season.formatted} value={season.id}/>
						)
					}
				</Field>
				<div style={{width:'20%', paddingTop:15}}>
					<p>Create a new season?</p>
				</div>
			</div>	
			<RaisedButton 
				type="submit"
				style={{marginBottom:0}}
				fullWidth={true}
				primary={true}
				label="Update"
			/>
		</form>
	)
}

export default reduxForm({
	form:'UpdateTeamForm',
	onSubmit: createTeam,
	onSubmitSuccess: openSnackbar,
})(UpdateTeamForm)

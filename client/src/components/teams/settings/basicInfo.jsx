import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { updateTeam, openSnackbar } from '../../../actions/index';
import validate from '../../forms/validation';



const getById = (list, id) => list.find(({_id}) => _id === id);

const UpdateTeamForm = props => {
	const { handleSubmit, initialValues, change, seasons } = props;

	return (
		<form onSubmit={handleSubmit} style={{padding: 10}}>
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
					style={{width:'20%', paddingTop:25}}
				>
					<RadioButton  label="Dek" value="Dek"/>
					<RadioButton label="Roller" value="Roller"/>
				</Field>
			</div>
			<div style={{width:'100%',display:'flex', justifyContent:'space-around', marginBottom:40}}>
				<Field 
					name="currentSeason._id"
					onChange={(_, _id) => change('currentSeason', getById(seasons, _id))}
					style={{width:'45%'}}
					component={SelectField}
					floatingLabelText="Current Season"
				>	
					{
						seasons.map((season, i) => 
							<MenuItem key={i} primaryText={season.formatted} value={season._id}/>
						)
					}
				</Field>

				<div style={{width:'20%', paddingTop:25}}>
					<p>Create a new season?</p>
				</div>	
			</div>	
			<div style={{position:'absolute', right:10, bottom:10}}>
				<RaisedButton
					style={{marginRight:10}} 
					label="Update"
					type="submit"
					primary={true}
				/>
				<RaisedButton
					secondary={true}
					onTouchTap={() => props.reset()}
					label="Reset"
					style={{marginRight:15}}
				/>
			</div>
		</form>
	)
}

export default reduxForm({
	form:'UpdateTeamForm',
	onSubmit: updateTeam,
	onSubmitSuccess: openSnackbar,
	validate,
})(UpdateTeamForm)

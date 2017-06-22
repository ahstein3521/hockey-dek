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
		<form onSubmit={handleSubmit} className="form">
			<div className="form-row">
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
			<div className="form-row">
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

				<div style={{width:'40%', paddingTop:25}}>
					<p>Create a new season?</p>
				</div>	
			</div>	
			<div className="btn-group">
				<RaisedButton
					className="form-btn"
					label="Update"
					type="submit"
					primary={true}
				/>
				<RaisedButton
					className="form-btn"
					secondary={true}
					onTouchTap={() => props.reset()}
					label="Reset"
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

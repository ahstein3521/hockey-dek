import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { updateTeam, openSnackbar } from '../../../actions/index';
import validate from '../../utils/validation';



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
					<Link to={
						{pathname:'/teams/new-season', 
						state: { title: initialValues.name, subtitle: 'New Season', seasons}}} >
						Create a new season?
					</Link>	
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

function mapStateToProps({ teams }) {
	return { 
		initialValues: teams.selected, 
		seasons: teams.selected.seasons 
	}
}

const formWrapper = reduxForm({
	form:'UpdateTeamForm',
	onSubmit: updateTeam,
	onSubmitSuccess: openSnackbar,
	validate,
})(UpdateTeamForm);

export default connect(mapStateToProps)(formWrapper);
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createPlayer, openSnackbar } from '../../../actions/index';
import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { basicInfoStyle as style } from '../../../styles/index';
import validate from './validate.js';

const renderTextField = props => (
	<TextField
		floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
	/>
);



let PlayerForm = props => {
	const { handleSubmit, teamList } = props;

	return(
		<form 
			style={style.form}
			onSubmit={handleSubmit}>
			<div style={style.formRow}>
				<Field label="First name" name="firstName" component={renderTextField} />
				<Field label="Last name"  name="lastName"  component={renderTextField} />
			</div>
			<div style={style.formRow}>
				<Field label="Phone number" name="phone" component={renderTextField} />
				<Field label="Email" name="email" component={renderTextField} />
			</div>
			<div style={style.formRow}>
				<Field
					floatingLabelText="Team"
					name="team"
					maxHeight={300}
					component={SelectField}
				>
				{
					teamList.map( team => 
						<MenuItem 
							key={team._id}
							value={team.currentSeason._id} 
							primaryText={team.name} 
							secondaryText={team.hockeyType}
						/>
					)
				}
				</Field>
				<Field 
					label="Jersey number" 
					type="number" 
					name="jerseyNumber" 
					component={renderTextField} 
				/>
			</div>
			<RaisedButton 
				fullWidth={true}
				primary={true}
				label="Create Player"
				type="submit"
				{...style.submitBtn}
			/>
		</form>
	)
}	

function mapStateToProps(state) {
	return { teamList: state.teams.list }
}
	
PlayerForm = reduxForm({
	form:'CreatePlayerForm',
	onSubmit: createPlayer,
	onSubmitSuccess: openSnackbar,
	validate
})(PlayerForm);

export default connect(mapStateToProps)(PlayerForm);
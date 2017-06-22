import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { updatePlayer } from '../../../actions/index';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { basicInfoStyle as style } from '../../../styles/index';


let PlayerForm = props => {
	const { handleSubmit } = props;

	return(
		<form 
			style={style.form}
			onSubmit={handleSubmit}>
			<div style={style.formRow}>
				<Field floatingLabelText="First name" name="firstName" component={TextField} />
				<Field floatingLabelText="Last name"  name="lastName"  component={TextField} />
			</div>
			<div style={style.formRow}>
				<Field floatingLabelText="Phone number" name="phone" component={TextField} />
				<Field floatingLabelText="Email" name="email" component={TextField} />
			</div>
			<div style={style.formRow}>
				<Field 
					floatingLabelText="Jersey number" 
					type="number" 
					name="jerseyNumber" 
					component={TextField} 
				/>
			</div>
			<RaisedButton 
				fullWidth={true}
				primary={true}
				label="Update Player's Info"
				type="submit"
				{...style.submitBtn}
			/>
		</form>
	)
}	
	
export default reduxForm({
	form:'playerEditForm',
	onSubmit: updatePlayer,
	enableReinitialize:true,
})(PlayerForm);



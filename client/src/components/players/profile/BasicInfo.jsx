import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { updatePlayer } from '../../../actions/index';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { basicInfoStyle as style } from '../../../styles/index';


let PlayerForm = props => {
	const { handleSubmit } = props;
	console.log(props.initialValues, 'forrrrm');
	return(
		<form 
			style={style.form}
			onSubmit={handleSubmit}>
			<div style={style.formRow}>
				<Field label="First name" name="firstName" component={TextField} />
				<Field label="Last name"  name="lastName"  component={TextField} />
			</div>
			<div style={style.formRow}>
				<Field label="Phone number" name="phone" component={TextField} />
				<Field label="Email" name="email" component={TextField} />
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



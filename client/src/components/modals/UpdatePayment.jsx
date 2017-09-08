import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { updatePayment, openSnackbar } from '../../actions/index';

import validate from '../utils/validation';

const normalize = (val, prevVal) => {
	const regex = /^[1-9]\d*$|^([1-9]\d*\.\d{0,2})$/;

	if (val < prevVal) return val;

	if (!val || !regex.test(val)) return prevVal;

	return val;

}

let CreatePaymentForm = props => {
	const { handleSubmit, error, season } = props;
	
	return (
		<form onSubmit={handleSubmit} className="form">
			<div style={{textAlign:'center'}}>
				<b>{`${season.team.name} - ${season.formatted}`}</b>
			</div>	
			<div className="form-row">
				<Field
					name="paymentType"
					component={SelectField}
					floatingLabelText="Payment Type"
				>
					<MenuItem value="Cash" primaryText="Cash"/>
					<MenuItem value="Check" primaryText="Check"/>
					<MenuItem value="Credit Card" primaryText="Credit Card"/>
					<MenuItem value="Other" primaryText="Other"/>
				</Field>
			</div>
			<div className="form-row">
				<div>
					<b>$</b>
					<Field
						name="amount"
						normalize={normalize}
						component={TextField}
						floatingLabelText="Amount Paid"
					/>
				</div>
			</div>
		</form>
	)
}

export default reduxForm({
	form:'UpdatePaymentForm',
	onSubmit: updatePayment,
	onSubmitSuccess: openSnackbar,
	validate,
})(CreatePaymentForm)


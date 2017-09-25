import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { processPayment, openSnackbar, updatePayment } from '../../actions/index';
import validate from '../utils/validation';

const normalize = (val, prevVal) => {
	const regex = /^[0-9]\d*$|^([1-9]\d*\.\d{0,2})$/;

	if (val < prevVal) return val;

	if (!val || !regex.test(val)) return prevVal;

	return val;

}

const newPayment = processPayment('payment');

let CreatePaymentForm = props => {
	
	
	return (
		
		<form onSubmit={props.handleSubmit} className="form">
			<div className="form-row">
				<Field
					name="type"
					component={SelectField}
					floatingLabelText="Payment Type"
				>
					<MenuItem value="Cash" primaryText="Cash"/>
					<MenuItem value="Check" primaryText="Check"/>
					<MenuItem value="Debit Card" primaryText="Debit Card"/>
					<MenuItem value="Credit Card" primaryText="Credit Card"/>
				</Field>
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

export const EditPaymentForm = reduxForm({
	form: 'EditPaymentForm',
	onSubmit: updatePayment
})(CreatePaymentForm);


export const NewPaymentForm = reduxForm({
	form:'NewPaymentForm',
	onSubmit: newPayment,
	onSubmitSuccess: openSnackbar
})(CreatePaymentForm);


import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton'
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, RadioButtonGroup } from 'redux-form-material-ui';
import { processPayment, openSnackbar, updatePayment } from '../../actions/index';
import PaymentHistory from '../common/paymentHistory.jsx';
import validate from '../utils/validation';

const newCredit = processPayment('credit');

const normalize = (val, prevVal) => {
	const regex = /^[1-9]\d*$|^([1-9]\d*\.\d{0,2})$/;

	if (val < prevVal) return val;

	if (!val || !regex.test(val)) return prevVal;

	return val;

}

let CreatePaymentForm = props => {
	
	
	return (
		
		<form onSubmit={props.handleSubmit} className="form">
			<div className="form-row">
				<Field
					name="reason"
					component={TextField}
					floatingLabelText="Reason"
				/>
				<div>
					<b>$</b>
					<Field
						name="amount"
						component={TextField}
						floatingLabelText="Amount Paid"
					/>
				</div>
			</div>
		</form>
		
	)
}

export const AddCreditForm = reduxForm({
	form:'NewCreditForm',
	onSubmit: newCredit,
	onSubmitSuccess: openSnackbar,
})(CreatePaymentForm);

export const EditCreditForm = reduxForm({
	form: 'EditCreditForm',
	onSubmit: updatePayment
})(CreatePaymentForm);



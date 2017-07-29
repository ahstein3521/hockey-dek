import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getNewFormVals } from './selector';
import SuspensionForm from './form.jsx';
import { suspendPlayer, openSnackbar } from '../../../actions/index';
import validate from './validate';

const NewSuspensionForm = reduxForm({
	form:'NewSuspensionForm',
	onSubmit: suspendPlayer,
	onSubmitSuccess: openSnackbar,
	validate
})(SuspensionForm);

const selector = getNewFormVals();

function mapStateToProps(state) {
	const { initialValues, suspensions } = selector(state); 

	return { initialValues, suspensions };
}

export default connect(mapStateToProps)(NewSuspensionForm);
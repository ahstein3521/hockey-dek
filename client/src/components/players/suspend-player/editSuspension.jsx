import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getEditFormVals } from './selector';
import SuspensionForm from './form.jsx';
import { editSuspension, openSnackbar } from '../../../actions/index';
import validate from './validate';
import warn from './warn';

const EditSuspensionForm = reduxForm({
	form:'EditSuspensionForm',
	onSubmit: editSuspension,
	onSubmitSuccess: openSnackbar,
	validate,
	warn
})(SuspensionForm);

const selector = getEditFormVals();

function mapStateToProps(state, ownProps) {
	const { initialValues, suspensions } = selector(state, ownProps); 
	const showDeleteButton = true;
	return { initialValues, suspensions, showDeleteButton };
}

function mapDispatchToProps(dispatch) {
	const type = 'OPEN_MODAL';
	const view = 'deleteSuspension';

	return {
		openModal: data => 
			dispatch({ type, payload: { view, data }})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSuspensionForm);
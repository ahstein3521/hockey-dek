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
	validate
})(SuspensionForm);


function mapStateToProps(state, ownProps) {
	const { location: { state: { record, season }}} = ownProps;
	const initialValues = {
		...record,
		seasonDisplay: `${season.team} - ${season.displayName}`
	};
	return { initialValues, season }
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
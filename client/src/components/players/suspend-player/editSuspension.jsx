import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import SuspensionForm from './form.jsx';
import { editSuspension, openSnackbar } from '../../../actions/index';
import validate from './validate';


const EditSuspensionForm = reduxForm({
	form:'EditSuspensionForm',
	onSubmit: editSuspension,
	validate
})(SuspensionForm);


function mapStateToProps(state, ownProps) {
	const { location: { state: { record, season, index, i }}, history } = ownProps;
	const initialValues = {
		...record,
		index,
		i,
		seasonDisplay: `${season.team} - ${season.displayName}`
	};
	return { 
		initialValues, 
		season, 
		showDeleteButton: true, 
		history,
		onSubmitSuccess: history.goBack 
	}
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
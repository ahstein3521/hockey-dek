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


function mapStateToProps(state, ownProps) {
	const { location: { state: { season = {} }}} = ownProps;
	const seasonDisplay = `${season.team} - ${season.displayName}`
	
	return {  initialValues: { season: season._id, seasonDisplay }};
}

export default connect(mapStateToProps)(NewSuspensionForm);
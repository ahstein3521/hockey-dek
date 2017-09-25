import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import SuspensionForm from './form.jsx';
import { suspendPlayer, openSnackbar } from '../../../actions/index';
import validate from './validate';

const NewSuspensionForm = reduxForm({
	form:'NewSuspensionForm',
	onSubmit: suspendPlayer,
	validate
})(SuspensionForm);


function mapStateToProps(state, ownProps) {
	const { location: { state: { season = {}, playerId }}, history } = ownProps;
	const seasonDisplay = `${season.team} - ${season.displayName}`
	

	return {  
		initialValues: { 
			playerId,
			start: new Date(),
			end: new Date().setDate(new Date().getDate() + 7),
			quarter: season.quarter,
			year: season.year, 
			seasonDisplay 
		},
		onSubmitSuccess: history.goBack
	};
}

export default connect(mapStateToProps)(NewSuspensionForm);
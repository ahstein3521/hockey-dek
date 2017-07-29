import React from 'react';
import { reduxForm } from 'redux-form';

import CreateTeamForm from './CreateTeam.jsx';
import DeleteTeam from './deleteTeam.jsx';
import SuspensionForm from './SuspensionForm.jsx';
import PaymentForm from './UpdatePayment.jsx';

const mappings = {
	default: {
		title:'',
		Children: null,
		onSubmit: null,
	},
	
	logout: {
		title: 'Are you sure you want to log out?',
		Children: null,          
		onSubmit: 'logOut',
	},
	deleteTeam: {
		title: 'Delete a team',
		Children: DeleteTeam,
		onSubmit: 'deleteTeam'
	},
	deleteSuspension: {
		title: 'Are you sure you want to delete this suspension from this player\'s record?',
		Children:null,
		onSubmit: 'deleteSuspension'
	},
	createTeam: {
		title: 'Create a new team',
		Children: CreateTeamForm,
		onSubmit:null,
		reduxFormName: 'CreateTeamForm'
	},
	newSuspension: {
		title: 'Suspend Player',
		Children: SuspensionForm,
		onSubmit: null,
		reduxFormName: 'SuspensionForm',
	},
	UpdatePayment: {
		title: 'Update Payment',
		Children: PaymentForm,
		reduxFormName: 'UpdatePaymentForm'
	}

};


export default mappings;
import React from 'react';
import { reduxForm } from 'redux-form';

import CreateTeamForm from './CreateTeam.jsx';
import DeleteTeam from './deleteTeam.jsx';
import SuspensionForm from './SuspensionForm.jsx';
import PaymentForm from './UpdatePayment.jsx';
import NewPaymentForm from './AddPayment.jsx';
import PaymentHistory from '../common/paymentHistory.jsx';
import NewCreditForm from './AddCreditForm.jsx';
import CreditHistory from './CreditHistory.jsx';
import RemovePlayer from './removePlayerFromTeam.jsx';

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
	},
	NewPayment: {
		title: 'New Payment',
		Children: NewPaymentForm,
		reduxFormName: 'NewPaymentForm'
	},
	DeletePayment: {
		title: 'Delete payment?',
		onSubmit: 'deletePayment'
	},
	paymentHistory: {
		title: 'Payments',
		Children: PaymentHistory,
		hideActions:true
	},
	creditHistory: {
		title: 'Credits',
		Children: CreditHistory,
		hideActions:true
	},
	NewCredit: {
		title: 'New Credit',
		Children: NewCreditForm,
		reduxFormName: 'NewCreditForm'
	},
	RemovePlayer: {
		title: 'Remove from team',
		Children: RemovePlayer,
		onSubmit:'removePlayerFromGame',
		closeOnSubmit: true
	}		
};


export default mappings;
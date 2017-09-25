import React from 'react';
import { reduxForm } from 'redux-form';

import CreateTeamForm from './CreateTeam.jsx';
import DeleteTeam from './deleteTeam.jsx';
import SuspensionForm from './SuspensionForm.jsx';
import { NewPaymentForm, EditPaymentForm } from './AddPayment.jsx';
import PaymentHistory from '../common/paymentHistory.jsx';
import { AddCreditForm, EditCreditForm } from './AddCreditForm.jsx';
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
	NewPayment: {
		title: 'New Payment',
		Children: NewPaymentForm,
		reduxFormName: 'NewPaymentForm'
	},
	EditPayment: {
		title: 'Edit Payment',
		Children: EditPaymentForm,
		reduxFormName: 'EditPaymentForm'
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
		Children: AddCreditForm,
		reduxFormName: 'NewCreditForm'
	},
	EditCredit: {
		title: 'Edit credit',
		Children: EditCreditForm,
		reduxFormName: 'EditCreditForm'
	},
	RemovePlayer: {
		title: 'Remove from team',
		Children: RemovePlayer,
		onSubmit:'removePlayerFromGame',
		closeOnSubmit: true
	}		
};


export default mappings;
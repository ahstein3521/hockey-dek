import React from 'react';
import { reduxForm } from 'redux-form';

import CreateTeamForm from './CreateTeam.jsx';
import DeleteTeam from './deleteTeam.jsx';
import SuspensionForm from './SuspensionForm.jsx';

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
		title: `Delete a team`,
		Children: DeleteTeam,
		onSubmit: 'deleteTeam'
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
	}

};


export default mappings;
import { reset, submit } from 'redux-form';
import { OPEN_SNACKBAR } from './constants';
//a mapping of success messages. Will be moved to it's own file

const getGessage = ({values, form}) => {
	
	const { team } = values;

	const messages = {
		CreateTeamForm: `A new team has been successfully created`,
		UpdateTeamForm: 'Your team has been updated',
		 
	};

	return messages[form];
};

//Action to trigger the snackbar component once a form submits successfully

export function openSnackbar(results, dispatch, props){

	const message = getGessage(props);

	dispatch({ type: OPEN_SNACKBAR, payload: message });
	
	// dispatch(reset(form));
}

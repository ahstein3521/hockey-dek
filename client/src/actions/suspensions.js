import axios from 'axios';
import { 
	UPDATE_PLAYER_INFO,
	CLOSE_MODAL,
	ROOT_URL,
	SET_LOAD_STATE,  
} from './constants';

import { remove, findIndex } from 'lodash';

//In the database, suspension data is stored as an array of objects representing 
//a single suspension. When it is sent to  
//the clientside, it becomes an array of objects grouped by season.
//Each object contains a 'season' key and a 'records' key
//The records key contains an array of each individual suspension of the season

//Each of the following functions must update the database, and once the server 
//sends back a successful response, the player's 'suspension' state must be modified
//to reflect those changes

const url = `${ROOT_URL}/player/update`;

function configureDispatch(dispatch) {
	return function(update) {
		return dispatch({
			type: UPDATE_PLAYER_INFO, 
			payload: update, 
			category: 'suspensions' 			
		})
	}
}

export function suspendPlayer(form, dispatch, props) {
	
	const sendUpdate = configureDispatch(dispatch);

	//Filter out form values not being sent to server
	//These values were computed by the 'selector' 
	const { selectedSeasonId, index, playerId, ...values } = form;
	let { suspensions } = props;

	//The input name attribute is selectedSeasonId by the 
	//suspension schema uses the property 'season';
	values.season = selectedSeasonId;	

	//Push object into the records array of the correct suspension object
	suspensions[index].records.push(values);

	//Format query and update to be passed into mongoose
	const query = { _id: playerId };
	const update = { $push: { suspensions: values }}

	axios.put(url, { query, update })
		.then(() => sendUpdate(suspensions))
		.then(() => props.history.goBack())
		.catch(err => console.error(err))
}

export function editSuspension(form, dispatch, props) {
	const sendUpdate = configureDispatch(dispatch);
	const { selectedSeasonId, index, recordIndex, ...values } = form;
	const { suspensions } = props;
	const query = { 'suspensions._id' : values._id };
	let records = suspensions[index].records;
	
	//Edge case - User changes the season that the player is suspended
	if (selectedSeasonId !== values.season) {
		//Change the value of the seasonId being sent to the server
		values.season = selectedSeasonId;

		//Delete the record from the client side so its no longer associated with 
		//the previous season	
		records.splice(recordIndex, 1);

		//Find the correct season and move record there
		for (let i = 0; i < suspensions.length; i++) {
				let { records, season} = suspensions[i];

				if (season._id === selectedSeasonId) {
					records.push(values);
				}
		}
	} else {
		//If season is the same, modify the correct 
		//record index for displaying on the clientside view
		records[recordIndex] = values;
	}

	//Format the update object to pass into mongoose's model.update() method 
	const update = {
		$set: { 'suspensions.$': values }
	};

	//Send request to server
	axios.put(url, { query, update})
		.then(() => 
			//if request was successful ie the document updated in the db, 
			//then modify the clientside state
			sendUpdate(suspensions)
		)
		//using react-router, redirect the user to the previous route
		.then(() => props.history.goBack())			
}

export function deleteSuspension(props) {
	const { initialValues, suspensions, history } = props;
	const { _id, index, recordIndex } = initialValues;
	
	const query = { 'suspensions._id': _id };
	const update = { $pull: { suspensions: { _id }}};

	const records = suspensions[index].records;
	records.splice(recordIndex, 1);

	return dispatch => {
		const sendUpdate = configureDispatch(dispatch);

		dispatch({ type: CLOSE_MODAL });

		axios.put(url, { query, update })
			.then(() => sendUpdate(suspensions))
			.then(() => history.goBack())
	}

	
}

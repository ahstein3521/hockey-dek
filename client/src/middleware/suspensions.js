import axios from 'axios';

export function addSuspension(action, dispatch, getState) {
	console.log(action.suspension);

	const suspensions = getState().player.selected.suspensions;
	
	suspensions[0].records.push(action.suspension);
	console.log({ suspensions })
	dispatch({ 
		type: 'UPDATE_PLAYER_INFO', 
		category: 'suspensions', 
		payload: suspensions
	})
}

export function editSuspension(action, dispatch, getState) {
	const playerSuspensions = getState().player.selected.suspensions;
	const { end, start, reason, index, i } = action.suspension;

	playerSuspensions[index].records[i].start = start;
	playerSuspensions[index].records[i].end = end;
	playerSuspensions[index].records[i].reason = reason;
	
	dispatch({ 
		type: 'UPDATE_PLAYER_INFO', 
		category: 'suspensions', 
		payload: playerSuspensions 
	})
}
import axios from 'axios';
import { 
	UPDATE_PLAYER_INFO,
	CLOSE_MODAL,
	ROOT_URL,
	SET_LOAD_STATE,  
} from './constants';


export function suspendPlayer(form, dispatch) {

	const { quarter, year, reason, season, playerId, start, end } = form;
	const url = `${ROOT_URL}/player/suspension/${playerId}`;
	const suspension = {
		start,
		end,
		quarter,
		year,
		reason
	};


	axios.put(url, suspension)
		.then(({data}) => 
			dispatch({ type: 'ADD_SUSPENSION', category: 'suspensions', suspension: data })
		)
}


export function editSuspension(form, dispatch) {
	const { start, end, _id, reason, index, i } = form;
	const url = '/player/update';
	const query = { 'suspensions._id' : _id };
	const update = {
		$set: { 'suspensions.$': { start, end, reason } }
	};

	axios.put(url, { query, update})
		.then(() => 
			dispatch({ type: 'EDIT_SUSPENSION', suspension: form })
		)
		
}

export function deleteSuspension({data}) {
	const { _id, index, i, history } = data;
	const url = '/player/update';
	const query = { 'suspensions._id': _id };
	const update = { $pull: { suspensions: { _id }}};

	
	return (dispatch, getState) => {
		const suspensions = getState().player.selected.suspensions;

		dispatch({ type: CLOSE_MODAL });

		axios.put(url, { query, update })
			.then(() => {
				suspensions[index].records.splice(i, 1);
				dispatch({ type: UPDATE_PLAYER_INFO, category: 'suspensions', payload: suspensions});

			})
			.catch(err => res.send(err))
	}
	return {type:'sdfds'}

	
}

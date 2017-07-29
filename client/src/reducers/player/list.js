import { FETCH_PLAYER_LIST, UPDATE_PLAYER_LIST_INDEX, ADD_PLAYER } from '../../actions/constants';
import { findIndex } from 'lodash';

export default function(state = [], action) {
	const { type, payload } = action;

	switch(type){
		case ADD_PLAYER:
			return [...state, payload];

		case FETCH_PLAYER_LIST:
			return payload;

		case UPDATE_PLAYER_LIST_INDEX:
			const index = findIndex(state, {_id: payload._id});
			return [
				...state.slice(0, index), 
				payload, 
				...state.slice(index+1)
			];	
	}
	return state;
}
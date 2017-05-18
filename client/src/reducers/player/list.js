import { FETCH_PLAYER_LIST, UPDATE_NAME_LIST } from '../../actions/constants';
import { findIndex } from 'lodash';

export default function(state = [], action) {
	const { type, payload } = action;

	switch(type){
		case FETCH_PLAYER_LIST:
			return payload;
		case UPDATE_NAME_LIST:
			const index = findIndex(state, {_id: payload._id});
			return [...state.slice(0, index), payload, ...state.slice(index+1)];	
	}
	return state;
}
import {replaceIndex, sortList} from '../utils';
import { FETCH_TEAM_ROSTER, UPDATE_PLAYER_IN_ROSTER, UPDATE_ROSTER } from '../../actions/constants'

export default function(state = {}, action){
	const {type, payload} = action;
	
	switch(type){
		case FETCH_TEAM_ROSTER:
			return payload
		case UPDATE_ROSTER:
			return {...state, team: {...state.team, ...payload}}
		case UPDATE_PLAYER_IN_ROSTER:
			const players = replaceIndex(state.team.players, payload);
			return {...state, team:{...state.team, players}}	
	}
	return state;		
}

	
// import { FETCH_TEAM_ROSTER, UPDATE_PLAYER_IN_ROSTER } from '../../actions/constants'

export default function(state = {}, action){
	const {type, payload} = action;
	
	switch(type){
		case 'FETCH_TEAM_SETTINGS':
			console.log({action});
			return payload;
	}
	return state;		
}

	
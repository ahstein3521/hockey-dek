import { SELECT_PLAYER, UPDATE_PLAYER_GAMES, UPDATE_PLAYER_INFO } from '../../actions/constants';

export default function( state = null, action ) {
	switch(action.type){
		case SELECT_PLAYER:
			return action.payload;
		case UPDATE_PLAYER_INFO:
			return { ...state, [action.category]: action.payload };	
	}
	return state;
}
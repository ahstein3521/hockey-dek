import { 
	SELECT_PLAYER,
	SELECT_PLAYER_TAB, 
	UPDATE_PLAYER_INFO 
} from '../../actions/constants';

export default function( state = { tab: 1 }, action ) {
	switch(action.type){
		case SELECT_PLAYER:
			return { ...action.payload, tab: 1 };
		case SELECT_PLAYER_TAB:
			return { ...state, tab: action.payload };
		case UPDATE_PLAYER_INFO:
			return { ...state, [action.category]: action.payload };	
	}
	return state;
}
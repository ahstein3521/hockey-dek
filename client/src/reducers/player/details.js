import { 
	SELECT_PLAYER,
	SELECT_PLAYER_TAB, 
	UPDATE_PLAYER_INFO 
} from '../../actions/constants';

export default function( state = { tab: 1 }, action ) {
	switch(action.type){
		
		case SELECT_PLAYER:
			console.log(action);
			return { ...action.payload, tab: 1 };
		case 'SELECT_PLAYER_CATEGORY':
			
			return { ...state, tab: action.tab };
		case 'FETCH_PLAYER_CATEGORY':
			
			return { ...state, tab: action.tab, [action.category]: action.newData }	
		
		case UPDATE_PLAYER_INFO:
			return { ...state, [action.category]: action.payload };	
	}
	return state;
}
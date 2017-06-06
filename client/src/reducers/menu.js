import { TOGGLE_MENU } from '../actions/constants';

export default function(state = {open:true, selected:null }, action){
	switch(action.type){
		case TOGGLE_MENU:
			return {...state, open: !state.open}	
		case 'SELECT_MENU_ITEM':
			return {...state, selected: action.payload}	
	}
	return state
}
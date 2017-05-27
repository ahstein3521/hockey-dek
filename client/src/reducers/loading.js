import { SET_LOAD_STATE } from '../actions/constants';

export default function(state = true, action){
	switch(action.type){
	
	case SET_LOAD_STATE:
		return action.payload;
	}
	return state;
}
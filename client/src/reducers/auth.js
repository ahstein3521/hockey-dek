import { VERIFY_AUTH_STATUS, LOG_OUT_USER } from '../actions/constants';

const defaultState = {loggedIn:false, loading:true}

export default function(state = defaultState, action) {
	switch(action.type){
		case VERIFY_AUTH_STATUS:
			return action.payload;
		case LOG_OUT_USER:
			return { loggedIn:false, loading:false };
	}
	return state;
}
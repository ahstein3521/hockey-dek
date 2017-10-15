import { FETCH_TEAM_LIST, ADD_TEAM, DELETE_TEAM } from '../../actions/constants'

export default function(state = [], action) {
	switch(action.type){
		case FETCH_TEAM_LIST:
			return action.payload;	
		case ADD_TEAM:
			return [ ...state, action.payload ];
		case DELETE_TEAM:
			return state.filter( team => team._id !== action.payload);			 		
	}
	return state;
}


	
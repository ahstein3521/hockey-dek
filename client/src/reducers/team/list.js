import { FETCH_TEAM_LIST } from '../../actions/constants'

export default function(state = [], action) {
	switch(action.type){
		case FETCH_TEAM_LIST:
			return action.payload;	 		
	}
	return state;
}


	
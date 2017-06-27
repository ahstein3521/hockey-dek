// import { TOGGLE_MENU } from '../actions/constants';
import { combineReducers } from 'redux';

export default function (state = {}, action) {

	switch (action.type) {

	case 'FETCH_CHECKIN_LIST':
		return {...action.payload, checkIns: {}};

	case 'UPDATE_CHECKIN':
		return {...state, 
			checkIns: {
				...state.checkIns, 
				[action.payload.playerId]: action.payload.isInputChecked 
			}
		};
	}
	
	return state;
}



// export default combineReducers({
// 	...mainReducer,
// 	checkIns: checkInReducer
// })
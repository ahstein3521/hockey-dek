// import { TOGGLE_MENU } from '../actions/constants';
import { combineReducers } from 'redux';

const defaultState = {
	availableTeams: [],
	selectedTab: 1,
	checkIns: {},
	team1: [],
	team2: []
}

function removePlayer(state, action) {
	const { team1, team2 } = state;
	const { payload, team } = action;

	const field = team === team1._id? 'team1' : 'team2';

	return {
		...state, 
		[field]: {
			...state[field],
			...payload
		} 
	}

}


export default function (state = defaultState, action) {

	switch (action.type) {


	case 'FETCH_AVAILABLE_TEAMS':
		return {...state, availableTeams: action.payload };
	
	case 'FETCH_CHECKIN_LIST':	
		return { ...state, ...action.payload };
	
	case 'ADD_PLAYER_TO_GAME':
		return { 
			...state, 
			[action.team]: {...state[action.team], ...action.payload },
			[action.otherTeam.teamNumber]: { ...action.otherTeam.update }
		};
	case 'REMOVE_PLAYER_FROM_GAME':
		return removePlayer(state, action);
	case 'UPDATE_GAME_PAYMENT':
		return {
			...state,
			[`team${state.selectedTab}`]: {...state[`team${state.selectedTab}`], ...action.payload },
		}
	case 'SELECT_GAME_TAB':
		console.log(action);
		return { ...state, selectedTab: action.tab };	
	case 'UPDATE_CHECKIN':
		return {
			...state, 
			checkIns: {
				...state.checkIns, 
				[action.playerId]: action.isInputChecked 
			}
		};
	}
	
	return state;
}



// export default combineReducers({
// 	...mainReducer,
// 	checkIns: checkInReducer
// })
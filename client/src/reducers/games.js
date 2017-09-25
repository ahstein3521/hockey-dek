
const defaultState = {
	availableTeams: [],
	selectedTab: 1,
	gameId: null,
	checkIns: {},
	team1: {team: {name: null}},
	team2: {team: {name: null}}
}
//const defaultState1 = JSON.parse(localStorage.getItem('game'));

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

	case 'START_NEW_GAME':
		return defaultState;

	case 'FETCH_AVAILABLE_TEAMS':
		return {...state, availableTeams: action.payload };
	
	case 'FETCH_CHECKIN_LIST':	
		// localStorage.setItem('game', JSON.stringify({...state, ...action.payload}))
		return { ...state, ...action.payload };

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
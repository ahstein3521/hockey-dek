// import { TOGGLE_MENU } from '../actions/constants';
import { combineReducers } from 'redux';

const defaultState = {
	availableTeams: [],
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

function processPayment(state, action) {
	const { team, category, playerId, payment } = action;
	const teamState = {...state[team]};
		

	teamState.players.forEach(player => {
		if (player._id === playerId) {
			if (category === 'paid') {
				player.payments.push(payment);
				teamState.totalPaid += payment.amount;
			} else {
				player.comps.push(payment);
				teamState.totalComped += payment.amount;
			}		
			player.totals[category] += payment.amount;
			player.totals.total += payment.amount;
		}
	})
	return teamState;
}

function processPayment(state, action) {
	const { team, player } = action;
	const teamState = { ...state[team] };

	teamState.players.push(player);

	return teamState;
}


export default function (state = defaultState, action) {

	switch (action.type) {


	case 'FETCH_AVAILABLE_TEAMS':
		return {...state, availableTeams: action.payload };
	
	case 'FETCH_CHECKIN_LIST':	
		return {...state, ...action.payload, checkIns: {}};

	case 'GAMETIME_PAYMENT':
		return {...state, [action.team]: processPayment(state, action)}
	
	case 'ADD_PLAYER_TO_GAME':
		return { 
			...state, 
			[action.team]: {...state[action.team], ...action.payload },
			[action.otherTeam.teamNumber]: { ...action.otherTeam.update }
		};
	case 'REMOVE_PLAYER_FROM_GAME':
		return removePlayer(state, action);

	case 'UPDATE_CHECKIN':
		return {
			...state, 
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
// import { TOGGLE_MENU } from '../actions/constants';
const y = JSON.parse(localStorage.getItem('teams'));

const defaultState = {
	team1: y.team1,
	team2: y.team2
}



function processPayment(state, action) {
	const { team, category, playerId, payment } = action;
	const {...newState } = state;

	newState[team].players.forEach(player => {
		if (player._id === playerId) {
			if (category === 'paid') {
				player.payments.push(payment);
				newState[team].totalPaid += payment.amount;
			} else {
				player.comps.push(payment);
				newState[team].totalComped += payment.amount;
			}		
			player.totals[category] += payment.amount;
			player.totals.total += payment.amount;
		}
	})

	return newState;

}

export default function (state = defaultState, action) {

	switch (action.type) {
		case 'GAMETIME_PAYMENT':
			return processPayment(state, action);
		case 'FETCH_CHECKIN_LIST':
			return {...state, ...action.payload };	
	}
	
	return state;
}


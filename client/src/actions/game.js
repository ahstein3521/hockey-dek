import axios from 'axios';
import formatDate from '../components/utils/formatDate';

export function fetchRosters(form, dispatch, { history }) {
	const { team1, team2, date, hockeyType } = form;
	const gameDate = formatDate(date);

	const nextView = {
		pathname: '/games/check-in',
		state: { title: `New ${hockeyType} Game`, subtitle: gameDate }
	}

	history.push(nextView);

	dispatch({type:'SET_LOAD_STATE', payload: true});

	axios.get(`/season/check?team1=${team1._id}&team2=${team2._id}`)
		.then( response => 
				dispatch({ type: 'FETCH_CHECKIN_LIST', payload: { teams: response.data, gameDate }
			})
		)
			.then(() => dispatch({type:'SET_LOAD_STATE', payload: false}))
}

export function handleCheckIn(playerId, isInputChecked) {
		
	const payload = { playerId, isInputChecked }; 

		return { type: 'UPDATE_CHECKIN', payload };
}
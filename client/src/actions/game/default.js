import { ROOT_URL } from '../constants';
import axios from 'axios';
import formatDate from '../../components/utils/formatDate';

function buildQuery(object) {
	let arr = [];
	
	for (let field in object) {
		arr.push(`${field}=${object[field]}`)
	}
	return arr.join('&')
}

function setLoadState(dispatch){
	return function(isLoading) {
		return dispatch({ 
			type: 'SET_LOAD_STATE', 
			payload: isLoading 
		})
	}
}

export function filterTeams(values, dispatch, props) {
	const { year, quarter, hockeyType } = values;
	const query = buildQuery(values);
	const showSpinner = setLoadState(dispatch);

	showSpinner(true)

	axios.get(`${ROOT_URL}/game/teams?${query}`)
		.then(response => {
			const { teams } = response.data;
 				
			dispatch({ 
				type: 'FETCH_AVAILABLE_TEAMS', 
				payload: teams
			})
			if (response.data.new) {
		
				const names = ['Winter', 'Spring', 'Summer', 'Fall']; 
				const seasonName = names[quarter-1] + ' ' + year;
				props.history.push({
					pathname:'/games/add-season', 
					state: {
						title:`Import ${hockeyType} Teams`, 
						subtitle: seasonName,
						formValues: {...values, teams, seasonName }
						}
					})
			}
		})
		.then(() => showSpinner(false))
}


export function fetchRosters(form, dispatch, { history }) {
	let { team1, team2, date, hockeyType, year, quarter } = form;
	const [t1, t2] = [team1._id, team2._id]
	const gameDate = formatDate(date);
	const d = Date.parse(date);
	const body = {
		game: {
			team1: {info: t1}, 
			team2: {info:t2}, 
			date: d
		}
	}
	
	const nextView = {
		pathname: '/games/check-in',
		state: { 
			title: `${hockeyType} Game`, 
			subtitle: gameDate,
			year,
			quarter
		}
	}

	history.push(nextView);

	dispatch({type: 'SET_LOAD_STATE', payload: true })

	axios.post('/game/new', body)
		.then( ({data}) => {
			console.log({ data });
			dispatch({ 
				type: 'FETCH_CHECKIN_LIST', 
					payload: { 
						team1: data.teams[0],
						team2: data.teams[1],
						gameId: data.gameId,
						checkIns: data.checkIns,
						quarter: data.teams[0].quarter,
	 					year: data.teams[0].year,
						gameDate 
					}
				})
			}
		)
	.then(() => dispatch({type:'SET_LOAD_STATE', payload: false}))
	.catch(err => console.log({error: err}))
	
}

export function startNewGame() {
	return { type: 'START_NEW_GAME' };
}

export function deleteGame(gameId) {
	const route = `${ROOT_URL}/game/${gameId}`;

	return dispatch => {
		axios.delete(route)
			.then(() => 
				dispatch({ type: 'START_NEW_GAME' }))
			.catch(e => console.warn({ error: e }))
	}

}

export function addPlayerToGame(playerId, season, teams) {


	return dispatch =>
		axios.put('/season/roster/add', { season, playerId, teams })
			.then(res => {

				dispatch({
					type: 'FETCH_CHECKIN_LIST',
					payload: {
						team1: res.data[0],
						team2: res.data[1]
					}
				})
			})
}

export function removePlayerFromGame({_id, season}) {
	return dispatch =>
		axios.put('/season/roster/remove', {playerId:_id, seasonId:season._id})
			.then(res => {
				const { players, totalComped, totalPaid } = res.data[0];
		
				dispatch({
					type:'REMOVE_PLAYER_FROM_GAME',
					team: season._id,
					payload: {
						players,
						totalComped,
						totalPaid
					}				
				})
			})
}

export function handleCheckIn(playerId, isInputChecked, game) {
		
		return dispatch => 
			axios.put('/game/check-in', {...game, playerId, isInputChecked})
				.then((r) => {
				
					dispatch({ type: 'UPDATE_CHECKIN', playerId, isInputChecked })
				})
}

export function checkWaiverAtGame(values, event, isChecked) {
	const { waiver, playerId, year } = values;
	
	const route = isChecked? '/waiver' : '/waiver/remove';
	const body = isChecked? { year, playerId } : { playerId, waiverId: waiver[0]._id };
	



	return (dispatch, getState) => {

		let _game = getState().game;
		let team1 = { ..._game.team1 };
		let team2 = { ..._game.team2 };

		dispatch({ type: 'SET_LOAD_STATE', payload: true});
		
		axios.put(route, body)
			.then(({data}) => {
				
				[team1, team2].forEach(team => {
					
					for (let i = 0; i < team.players.length; i++) {
						if (team.players[i]._id === playerId) {
							team.players[i].waiver = isChecked ? 
								data.waivers.filter(v => v.year === year)
								: null;
						}
					}
				})
				dispatch({ type: 'SET_LOAD_STATE', payload: false});
				dispatch({ type: 'UPDATE_GAME_TEAMS', payload: { team1, team2, selectedTab: tab }});

			})
	}
}



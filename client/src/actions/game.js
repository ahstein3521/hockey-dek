import { ROOT_URL } from './constants';
import axios from 'axios';
import formatDate from '../components/utils/formatDate';

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

export function importTeams(vals, dispatch, props) {
	const { history } = props;
	

	let availableTeams = vals.teams.filter(team => team.checked);

	dispatch({ 
		type: 'FETCH_AVAILABLE_TEAMS', 
		payload: availableTeams
	})

	history.push({
		pathname: '/games/add-season/1',
		state: { 
			title: 'Select teams',
			formValues: { ...vals, teams: availableTeams }
		} 
	})	
}

export function fetchPrevRosters(vals, dispatch, props) {
	const { history, location } = props;
	const { formValues } = location.state;
	const { team1, team2 } = vals;

	history.push({
		pathname: '/games/add-season/2',
		state: { 
			title: 'Select Players',
			formValues: { ...formValues, team1, team2 }
		} 
	})


}

export function buildNewSeason(vals, dispatch, props) {
	let { quarter, year, team1, team2, teams, date, hockeyType } = vals;
	const modified = [...team1.players, ...team2.players];
	const noIndex = (id) => 
		modified.findIndex(v => v._id !== id) === -1;

	const seasons = [];
	const gameSeasons = [];

	teams.forEach(({values, teamName}) => {
		let season = { 
			year, 
			quarter, 
			team: values._id
		};

		if (teamName === team1.name) {
			season.players = team1.players;
			gameSeasons.push(season);
		} else if (teamName === team2.name) {
			season.players = team2.players;
			gameSeasons.push(season);
		} else {
			season.players = values.players.filter(player => {
				return team1.players.indexOf(player) == -1 && team2.players.indexOf(player) == -1
			})
			seasons.push(season);
		}
	});


	axios.post('/season/create', { seasons, gameSeasons })
		.then(({data}) => {
			const gameDate = formatDate(date);
				console.log(data,'data');

				if (data[0]._id == team1._id) {
					team1 = { ...team1, ...data[0] };
					team2 = { ...team2, ...data[1] };
				}
				else {
					team1 = { ...team1, ...data[1] }
					team2 = { ...team2, ...data[0] }					
				}				

				dispatch({ 
					type: 'FETCH_CHECKIN_LIST', 
					payload: { 
						team1,
						team2,
						quarter,
						year, 
						gameDate
					}
				})

				props.history.push({
					pathname: '/games/check-in',
					state: { 
						title: `New ${hockeyType} Game`, 
						subtitle: gameDate,
					}					
				})
		})
}

export function fetchRosters(form, dispatch, { history }) {
	let { team1, team2, date, hockeyType, year, quarter } = form;
	const [t1, t2] = [team1._id, team2._id]
	const gameDate = formatDate(date);
	const d = Date.parse(date);

	const nextView = {
		pathname: '/games/check-in',
		state: { 
			title: `New ${hockeyType} Game`, 
			subtitle: gameDate,
			year,
			quarter
		}
	}

	history.push(nextView);

	dispatch({type: 'SET_LOAD_STATE', payload: true })

	axios.get(`/season/checkins?team1=${t1}&team2=${t2}&date=${d}`)
		.then( response => {
				const teams = response.data;
				
				if (teams[0]._id == team1._id) {
					team1 = { ...team1, ...teams[0] }
					team2 = { ...team2, ...teams[1] }
				}
				else {
					team1 = { ...team1, ...teams[1] }
					team2 = { ...team2, ...teams[0] }					
				}				

				
				dispatch({ 
					type: 'FETCH_CHECKIN_LIST', 
					payload: { 
						team1,
						team2, 
						gameDate 
					}
				})
			}
		)
		.then(() => dispatch({type:'SET_LOAD_STATE', payload: false}))
}

export function addPlayerToGame(playerId, season, teamNumber) {
	let { otherTeam, ...newSeason } = season;

	otherTeam.players.forEach((player,i) => {
		if (player._id === playerId) {
			otherTeam.players.splice(i, 1);
			otherTeam.totalPaid -= player.totals.paid
			otherTeam.totalComped -= player.totals.comped;
		}
	})

	return dispatch =>
		axios.put('/season/roster/add', { newSeason, playerId})
			.then(res => {
				const { players, totalComped, totalPaid } = res.data[0]
				dispatch({
					type: 'ADD_PLAYER_TO_GAME',
					team: teamNumber,
					otherTeam: {
						teamNumber: otherTeam.teamNumber,
						update: otherTeam
					},
					payload: {
						players,
						totalComped,
						totalPaid
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

export function handleCheckIn(playerId, isInputChecked) {
		
	const payload = { playerId, isInputChecked }; 

		return { type: 'UPDATE_CHECKIN', payload };
}
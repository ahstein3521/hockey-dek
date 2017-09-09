import { ROOT_URL } from '../constants';
import axios from 'axios';
import formatDate from '../../components/utils/formatDate';


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

	const seasons = [];
	const gameSeasons = [];
	let _players = [];

	teams.forEach(({values, teamName}) => {
		let season = { 
			year, 
			quarter, 
			team: values._id
		};
		_players = _players.concat(values.players);

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


	axios.post('/season/create', { seasons, gameSeasons, players: _players })
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

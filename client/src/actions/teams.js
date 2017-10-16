import { SubmissionError } from 'redux-form';
import axios from 'axios';
import { 
	FETCH_TEAM_LIST,
	FETCH_TEAM_ROSTER, 
	ROOT_URL, 
	SET_LOAD_STATE, 
	ADD_TEAM,
	CLOSE_MODAL, 
	DELETE_TEAM 
} from './constants'; 


export function createTeam( form, dispatch ){
	
	const url = `${ROOT_URL}/team/create`;
	
	const { year, quarter , team } = form;
	const body = { season: {year, quarter}, team};

	axios.post(url, body)
		.then(({ data, status }) => {

			dispatch({type: CLOSE_MODAL});
			dispatch({ type: ADD_TEAM, payload: data });
		})
		.catch(err => {
			console.error('Error adding team',err);
		});
}

function getTeam(team) {
	const { currentSeason, _id } = team;
	const [tId, sId] = [_id, currentSeason._id];
	const query = `seasonId=${sId}&teamId=${tId}&roster=true`;
	console.log({ sId, tId });
	return axios.get(`${ROOT_URL}/team/search?${query}`);
}

function getAvailablePlayers(team) {
	const { currentSeason: { quarter, year }} = team;
	const [ q, y] = [ quarter, year ];

	const url = `${ROOT_URL}/season/available-players?quarter=${q}&year=${y}`;
	return axios.get(url);
}


export function submitTeamSearch(teamId){
		
	return (dispatch, getState) => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.get(`${ROOT_URL}/season?team=${teamId}`)
			.then((response) => {
				const team = getState().teams.list.find(v => v._id === teamId);
				const payload = {
					seasons: response.data,
					...team
				};
				dispatch({ type: 'FETCH_TEAM_SETTINGS', payload });
				dispatch({ type: SET_LOAD_STATE, payload: false })
			
			})
			.catch(e => { console.error(e)})
	}
}

export function fetchRoster(seasonId) {
	const url = `${ROOT_URL}/team/${seasonId}`;

	return dispatch => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.get(url)
			.then(({data}) => {
				console.log({ data });
				dispatch({ type: FETCH_TEAM_ROSTER, payload: data });
				dispatch({ type: SET_LOAD_STATE, payload: false });
			})
			.catch(err => console.log(err))
	}
}

export function updateTeam(form, dispatch) {
	const url = `${ROOT_URL}/team/${form._id}`;
	
	const { seasons, ...update } = form;

	
		axios.put(url, update)
			.then(({data}) => 
				dispatch({ 
					type: 'UPDATE_TEAM', 
					nextType: FETCH_TEAM_LIST,
					update
				})
			)
}

export function newSeasonForTeam(values, dispatch, props) {
	const team = props.location.state.seasons[0].team;
	const newSeason = { ...values, team };

	axios.post('/season', newSeason)
		.then(res => {

			dispatch({ type: 'UPDATE_TEAM_SEASON', nextType: FETCH_TEAM_LIST, team, newSeason: res.data._doc })
			
			const route = {
				pathname: '/teams/new-roster',
				state: {
					data: res.data,
					title: 'Roster'
				}
			};
			props.history.push(route)
			

		})
	

}
// export function updateRoster(currentSeason, players) {
// 	const { _id, quarter, year } = currentSeason;
// 	const reqBody = { ...players, quarter, year };
// 	const url = `${ROOT_URL}/season/update/roster/${_id}`;
	
// 	return dispatch => {
// 		axios.put(url, reqBody)
// 			.then(({data}) => {
// 				console.log(data)
// 				// const payload = data[0];
// 				dispatch({type:'UPDATE_ROSTER', payload: players })
// 			})
// 	}
// }

export function updateTeamLineup(values, dispatch, props) {
	const { currSeason } = props;
	const { players } = values;
	let newPlayers = [], oldPlayers = [];
	const { _id, quarter, year } = currSeason;
	players.forEach(player => {
		let index = currSeason.players.indexOf(player._id);
		if (index === -1) {
			newPlayers.push(player._id);
		} else {
			currSeason.players.splice(index, 1);
		}

	});

	oldPlayers = currSeason.players;
	
	axios.put('/season/roster/remove-many', {oldPlayers, seasonId:_id })
		.then(() =>
			axios.put('/season/roster/add-many', {newPlayers, seasonId: _id, quarter, year})
				.then((res) => {
					console.log({ res });
					dispatch({ type: 'OPEN_SNACKBAR', payload: 'ROSTER_UPDATED' })
				})
		)

}


export function newSeasonLineup(values, dispatch, props) {
	const {quarter, year, _id } = values._doc;
	const players = values.players.map(v => v._id);


	axios.put('/season/roster/add-many', {newPlayers: players, seasonId: _id, quarter, year})
		.then((res) => {
			console.log({ res });
			dispatch({ type: 'OPEN_SNACKBAR', payload: 'ROSTER UPDATED' });
			props.history.push('/teams');
		})

	console.log({ values, props });

}



export function deleteTeam(team) {
	
	return dispatch => {

		dispatch({ type: CLOSE_MODAL });

		axios.delete(`${ROOT_URL}/team/delete/${team._id}`)
			.then(() => 
				dispatch({type: DELETE_TEAM, payload: team._id })
			)
	}

}

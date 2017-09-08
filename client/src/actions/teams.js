import { SubmissionError } from 'redux-form';
import axios from 'axios';
import { 
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

	return axios.get(`${ROOT_URL}/team/search?${query}`);
}

function getAvailablePlayers(team) {
	const { currentSeason: { quarter, year }} = team;
	const [ q, y] = [ quarter, year ];

	const url = `${ROOT_URL}/season/available-players?quarter=${q}&year=${y}`;
	return axios.get(url);
}


export function submitTeamSearch(team){
	
	const { name, hockeyType, currentSeason, _id } = team;	
		
	return dispatch => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.all([ getAvailablePlayers(team), getTeam(team)])
			.then(axios.spread((players, response) => {
				
				let { seasons, team:[teamInfo] } = response.data;
				
				let teamData =  { name, hockeyType, currentSeason, _id, ...teamInfo };
				
				const payload = { 
					seasons, 
					team: teamData, 
					availablePlayers: players.data
				};
				
				dispatch({type: FETCH_TEAM_ROSTER, payload });
			
			})
		)
		.then(() =>
			dispatch({ type: SET_LOAD_STATE, payload: false })
		)
		.catch(e => { console.error(e)})
	}
}


export function updateTeam(form, dispatch, props){
	const url = `${ROOT_URL}/team/update/basic-info/${form.currentSeason.team}`;
	
	axios.put(url, form)
			.then(({data}) => console.log('Response', data))
}

export function updateRoster(currentSeason, players) {
	const { _id, quarter, year } = currentSeason;
	const reqBody = { ...players, quarter, year };
	const url = `${ROOT_URL}/season/update/roster/${_id}`;
	
	return dispatch => {
		axios.put(url, reqBody)
			.then(({data}) => {
				console.log(data)
				// const payload = data[0];
				dispatch({type:'UPDATE_ROSTER', payload: players })
			})
	}
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

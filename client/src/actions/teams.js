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

export function submitTeamSearch({ _id, currentSeason, name, hockeyType }){
	
	const url = `${ROOT_URL}/team/search/${currentSeason._id}/${_id}`;
		
	return dispatch => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.get(url)
			.then(({data}) => {
				
				let { seasons, team:[teamInfo] } = data;
				let teamData =  { name, hockeyType, currentSeason, ...teamInfo };
				const payload = { seasons, team: teamData };
				console.log(payload);
				return dispatch({type: FETCH_TEAM_ROSTER, payload })
			})
			.then(() => dispatch({ type: SET_LOAD_STATE, payload: false }))
			.catch(err => console.log(err));
	}
}


export function updateTeam(form, dispatch, props){
	const url = `${ROOT_URL}/team/update/basic-info/${form.currentSeason.team}`;
	
	axios.put(url, form)
			.then(({data}) => console.log('Response', data))
}

export function updateTeamPlayers(currentSeason, players) {
	const url = `${ROOT_URL}/team/update/players/${currentSeason}`;
	console.log('before post', players)
	return dispatch => {
		axios.put(url, players)
			.then(({data}) => {
				const payload = data[0];
				dispatch({type:'UPDATE_ROSTER', payload })
			})
	}
}

export function deleteTeam(team) {
	const teamId = team._id;
	return dispatch => {

		dispatch({ type: CLOSE_MODAL });

		axios.delete(`${ROOT_URL}/team/delete/${teamId}`)
			.then(() => dispatch({type: DELETE_TEAM, payload: teamId }))
	}

}

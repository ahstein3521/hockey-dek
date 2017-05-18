import axios from 'axios';
import { FETCH_TEAM_ROSTER, FETCH_TEAM_LIST, ROOT_URL } from './constants'; 

export function initTeamList(){
	return dispatch => {
		axios.get(`${ROOT_URL}/team/show`)
			.then(({data}) => {
				dispatch({ type: FETCH_TEAM_LIST, payload: data});
		})
	}
}


export function submitTeamSearch({ _id, currentSeason, ...reqBody}){
	
	const url = `${ROOT_URL}/team/search/${currentSeason}/${_id}`;

	return dispatch => {
		axios.post(url, reqBody)
			.then(({data}) => {
				return dispatch({type: FETCH_TEAM_ROSTER, payload: data})
			})
			.catch(err => console.log(err));
	}
}

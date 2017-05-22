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
	const {name, hockeyType} = reqBody;
	return dispatch => {
		axios.get(url)
			.then(({data}) => {
				const { seasons, team:[teamInfo] } = data;
				const payload = {seasons, team:{name,hockeyType,...teamInfo}};

				return dispatch({type: FETCH_TEAM_ROSTER, payload })
			})
			.catch(err => console.log(err));
	}
}

///USE RESELECT TO COMBINE PLAYERS ont TEAM REDUCER

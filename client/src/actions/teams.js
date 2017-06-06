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
import { kebabCase } from 'lodash';

export function createTeam( form, dispatch ){
	
	const url = `${ROOT_URL}/team/create`;

	const { name, hockeyType } = form.team;

	form.team._id = kebabCase( name + ' ' + hockeyType )
	
	axios.post(url, form)
		.then(({ data, status }) => {

			dispatch({type: CLOSE_MODAL});
			dispatch({ type: ADD_TEAM, payload: data });
		})
		.catch(err => {
				throw new SubmissionError({_error: 'A team with this name and hockey type already exists',_name:'ERROR'});
		});
}


export function submitTeamSearch({ _id, currentSeason, ...reqBody}){
	
	const url = `${ROOT_URL}/team/search/${currentSeason._id}/${_id}`;
	const {name, hockeyType} = reqBody;
	
	return dispatch => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.get(url)
			.then(({data}) => {
				const { seasons, team:[teamInfo] } = data;
				const payload = {seasons, team:{ name, hockeyType,...teamInfo}};

				return dispatch({type: FETCH_TEAM_ROSTER, payload })
			})
			.then(() => dispatch({ type: SET_LOAD_STATE, payload: false }))
			.catch(err => console.log(err));
	}
}

export function getTeamSettings({ _id, currentSeason, name, hockeyType }){
	
	const url = `${ROOT_URL}/team/settings/${currentSeason._id}/${_id}`;
	
	return dispatch => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.get(url)
			.then(({data: [settings]}) => {
				const payload = { ...settings, name, hockeyType };
				return dispatch({type: 'FETCH_TEAM_SETTINGS', payload})
			})
			.then(() => dispatch({ type: SET_LOAD_STATE, payload: false }))
			.catch(err => console.log(err));
	}
}


export function deleteTeam(team){
	const teamId = team._id;

	return dispatch => {

		dispatch({ type: CLOSE_MODAL });

		axios.delete(`${ROOT_URL}/team/delete/${teamId}`)
			.then(() => dispatch({type: DELETE_TEAM, payload: teamId }))
	}

}

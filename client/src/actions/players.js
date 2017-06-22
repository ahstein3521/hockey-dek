import axios from 'axios';
import { 
	SELECT_PLAYER, 
	UPDATE_PLAYER_IN_ROSTER,
	ADD_PLAYER, 
	UPDATE_PLAYER_INFO,
	UPDATE_PLAYER_LIST,
	ROOT_URL,
	SET_LOAD_STATE,  
} from './constants';

import { reset } from 'redux-form';

export function selectPlayer(player){
	return { type:SELECT_PLAYER, payload:player };
}

export function createPlayer(form, dispatch) {
	let { team, ...newPlayer } = form;
	
	if (team) {
		newPlayer.payments = [ {season: team, paymentType: 'N/A'} ]
	}

	const body = { seasonId: team, newPlayer };

	axios.post(`${ROOT_URL}/player/create`, body)
		.then(({data}) => dispatch({ type: ADD_PLAYER, payload: data }))
		.then(() => dispatch(reset('CreatePlayerForm')))
		.catch(err => console.error(err, 'ERROR '))
}



export function fetchPlayerDetails(player){
	const fullName = player.firstName + ' ' + player.lastName;

	return dispatch => {

		dispatch({ type: SET_LOAD_STATE, payload: true });

		axios.get(`${ROOT_URL}/player/fetch/${player._id}`)
			.then(({data}) => {
				const basicInfo = { ...player, ...data.basicInfo };
		
				dispatch({type: SELECT_PLAYER, payload: {...data, basicInfo}})
			})
			.then(() => 	dispatch({ type: SET_LOAD_STATE, payload: false }))
	}
}

export function updatePlayer( body, dispatch ){
	const url = `${ROOT_URL}/player/update/${body._id}`;

	axios.put(url, body)
		.then(({data})=> {
			dispatch({ type: UPDATE_PLAYER_INFO, payload:data })
			return data
		})
		.then(data => {
			dispatch({ type: UPDATE_PLAYER_LIST, payload:data})
			return data;
		})
		.then(data => {
			if(data.checkIns){
				return dispatch({type: UPDATE_PLAYER_IN_ROSTER, payload:data})
			}
			return data;
		})			
		.then(() => {
			dispatch({type:'OPEN_SNACKBAR',payload:'Player Updated'})
		})
		.catch(err => console.error("Something went wrong", err))
}
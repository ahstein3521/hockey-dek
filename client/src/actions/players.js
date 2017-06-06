import axios from 'axios';
import { 
	SELECT_PLAYER, 
	UPDATE_PLAYER_IN_ROSTER, 
	UPDATE_PLAYER_INFO,
	UPDATE_NAME_LIST,
	ROOT_URL 
} from './constants';


export function selectPlayer(player){
	return { type:SELECT_PLAYER, payload:player };
}

export function fetchPlayerDetails(player, redirect){

	const {_id} = player;
	return dispatch => {
		axios.get(`${ROOT_URL}/player/fetch/${_id}`)
			.then(({data}) => {
				const basicInfo = { ...player, ...data.basicInfo };
				dispatch({type: SELECT_PLAYER, payload: {...data, basicInfo}})
			})
			.then(() => {
				if(redirect){
					redirect();
				}
			})
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
			dispatch({ type: UPDATE_NAME_LIST, payload:data})
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